import { useState, useEffect, useContext } from "react";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../services/api";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Clientes.css";

const Clientes = () => {
  const { user } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    ciudad:"",
    cedula: "",
    telefono: "",
    email: "",
    direccion:"",
    fecha_nacimiento:"",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const res = await getClientes();
      setClientes(res.data);
    } catch {
      setMessage("Error al obtenere clientes");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cedula") {
      const soloDigitos = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, cedula: soloDigitos }));
      return;
    }

    if (name === "telefono") {
      const soloDigitos = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, telefono: soloDigitos }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCliente(editingId, formData);
        setMessage("Cliente actualizado correctamente");
        setEditingId(null);
      } else {
        await createCliente(formData);
        setMessage("Cliente creado correctamente");
      }
      setFormData({ nombre: "", apellido: "", cedula: "", telefono: "", email: "", direccion:"",
    fechaNacimiento:""  });
      fetchClientes();
    } catch {
      setMessage("Error al guardar el cliente");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEdit = (cli) => {
    setEditingId(cli._id);
    setFormData({
      nombre: cli.nombre || "",
      apellido: cli.apellido || "",
      cedula: cli.cedula || "",
      telefono: cli.telefono || "",
      email: cli.email || "",
      direccion: cli.direccion || "",
      fecha_nacimiento: cli.fecha_nacimiento|| "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este cliente?")) {
      try {
        await deleteCliente(id);
        setMessage("Cliente eliminado correctamente");
        fetchClientes();
      } catch {
        setMessage("Error al eliminar el cliente");
      } finally {
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  return (
    <div className="estudiantes-container">
      <div className="header-top">
        <h2>Bienvenido, {user.nombre}</h2>
        <button className="btn-back" onClick={() => navigate("/dashboard")}>← Dashboard</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="estudiantes-card">
        <h3>{editingId ? "Editar Cliente" : "Agregar Cliente"}</h3>

        <form onSubmit={handleSubmit} className="estudiantes-form">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />

          <label>Cédula</label>
          <input
            type="text"
            name="cedula"
            placeholder="Cédula (10 dígitos)"
            value={formData.cedula}
            onChange={handleChange}
            maxLength={10}
            inputMode="numeric"
            pattern="\d{10}"
            title="Debe contener exactamente 10 dígitos"
            required
          />

          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            inputMode="numeric"
            required
          />

          <label>Email</label>
          <input
            type="email"           
            name="email"
            placeholder="correo@dominio.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
          />

            <label>Fecha</label>
            <input
            type="text"           
            name="fecha_nacimiento"
            placeholder="fecha"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required
          />    

          

          <button type="submit" className="btn-add">
            {editingId ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>

      <div className="estudiantes-list">
        <h3>Lista de Clientes</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((e) => (
              <tr key={e._id}>
                <td>{e.nombre}</td>
                <td>{e.apellido}</td>
                <td>{e.cedula}</td>
                <td>{e.telefono}</td>
                <td>{e.direccion}</td>
                <td>{e.email}</td>
                <td>{e.fecha_nacimiento}</td>

                <td>
                  <button className="btn-edit" onClick={() => handleEdit(e)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(e._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
