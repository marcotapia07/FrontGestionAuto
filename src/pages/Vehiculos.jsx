import { useState, useEffect, useContext } from "react";
import { getVehiculos, createVehiculos, updateVehiculos, deleteVehiculo } from "../services/api";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Vehiculos.css";


const Vehiculos = () => {
  const { user } = useContext(AuthContext);
  const [vehiculos, setVehiculos] = useState([]);
  const [formData, setFormData] = useState({
    marca: "",
    modelo:"",
    anio_fabricacion: "",
    placa: "",
    color: "",
    tipo_vehiculo: "",
    kilometraje: "",
    descripcion: ""
    
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const res = await getVehiculos();
      setVehiculos(res.data);
    } catch {
      setMessage("Error al obtener el vehiculo");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "descripcion" && value.length > 50) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateVehiculos(editingId, formData);
        setMessage("Vehiculo actualizado correctamente");
        setEditingId(null);
      } else {
        await createVehiculos(formData);
        setMessage("Vehiculo agregado correctamente");
      }
      setFormData({ nombre: "", codigo: "", descripcion: "", creditos: "" });
      fetchVehiculos();
    } catch {
      setMessage("Error al guardar el vehiculo");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEdit = (veh) => {
    setEditingId(veh._id);
    setFormData({
      //nombre: veh.nombre || "",
      //codigo: veh.codigo || "",
      //descripcion: veh.descripcion || "",
      //creditos: veh.creditos || ""

      marca: veh.marca || "",
      modelo: veh.modelo || "",
      anio_fabricacion: veh.anio_fabricacion || "",
      placa: veh.placa || "",
      color: veh.color || "",
      tipo_vehiculo: veh.tipo_vehiculo || "",
      kilometraje: veh.kilometraje || "",
      descripcion: veh.descripcion || "",

      
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este vehiculo?")) {
      try {
        await deleteVehiculo(id);
        setMessage("Vehiculo eliminado correctamente");
        fetchVehiculos();
      } catch {
        setMessage("Error al eliminar el Vehiculo");
      } finally {
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  return (
    <div className="materias-container">
      <div className="header-top">
        <h2>Bienvenido, {user.nombre}</h2>
        <button className="btn-back" onClick={() => navigate("/dashboard")}>← Dashboard</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="materias-card">
        <h3>{editingId ? "Editar Vehiculo" : "Agregar Vehiculo"}</h3>

        <form onSubmit={handleSubmit} className="materias-form">
          <label>Marca</label>
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />

          <label>Modelo</label>
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />

          <label>Año de fabricacion</label>
          <input
            type="text"
            name="anio_fabricacion"
            placeholder="Año"
            value={formData.anio_fabricacion}
            onChange={handleChange}
            required
          />

          <label>Placa</label>
          <input
            type="text"
            name="placa"
            placeholder="Placa"
            value={formData.placa}
            onChange={handleChange}
            required
          />

          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            required
          />

          <label>Tipo de vehiculo</label>
          <input
            type="text"
            name="tipo_vehiculo"
            placeholder="Tipo"
            value={formData.tipo_vehiculo}
            onChange={handleChange}
            required
          />

          <label>Kilometraje</label>
          <input
            type="text"
            name="kilometraje"
            placeholder="Color"
            value={formData.kilometraje}
            onChange={handleChange}
            required
          />

          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            placeholder="Máximo 50 caracteres"
            value={formData.descripcion}
            onChange={handleChange}
            maxLength={50} 
          />
          
          <button type="submit" className="btn-add">
            {editingId ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>

      <div className="materias-list">
        <h3>Lista de Vehiculos</h3>
        <table>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Placa</th>
              <th>Color</th>
              <th>Tipo</th>
              <th>Kilometraje</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((m) => (
              <tr key={m._id}>
                <td>{m.marca}</td>
                <td>{m.modelo}</td>
                <td>{m.anioFabricacion}</td>
                <td>{m.placa}</td>
                <td>{m.color}</td>
                <td>{m.tipoVehiculo}</td>
                <td>{m.kilometraje}</td>
                <td>{m.descripcion}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(m)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(m._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehiculos;
