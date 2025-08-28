import { useState, useEffect, useContext } from "react";
import {  getReserva, createReserva, deleteReserva, getVehiculos, getClientes } from "../services/api";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Reservas.css";

const Reserva = () => {
  const { user } = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [formData, setFormData] = useState({ clienteId: "", vehiculoId: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resReservas, resClientes, resVehiculos] = await Promise.all([
        getReserva(),
        getClientes(),
        getVehiculos()
      ]);
      setReservas(resReservas.data);
      setClientes(resClientes.data);
      setVehiculos(resVehiculos.data);
    } catch (err) {
      setMessage("Error al obtener datos");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReserva(formData);
      setMessage("Reserva registrada correctamente");
      setFormData({ clienteId: "", vehiculoId: "" });
      fetchData();
    } catch (err) {
      setMessage("Error al registrar la reserva");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar esta reserva?")) {
      try {
        await deleteReserva(id);
        setMessage("Reserva eliminada correctamente");
        fetchData();
      } catch (err) {
        setMessage("Error al eliminar reserva");
      }
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="matriculas-container">
      <div className="header-top">
        <h2>Bienvenido, {user.nombre}</h2>
        <button className="btn-back" onClick={() => navigate("/dashboard")}>← Dashboard</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="matriculas-card">
        <h3>Registrar Reserva</h3>
        <form onSubmit={handleSubmit} className="matriculas-form">
          <label>Cliente:</label>
          <select name="clienteId" value={formData.clienteId} onChange={handleChange} required>
            <option value="">Selecciona un cliente</option>
            {clientes.map(e => (
              <option key={e._id} value={e._id}>{e.nombre} {e.apellido}</option>
            ))}
          </select>

          <label>Vehículo:</label>
          <select name="vehiculoId" value={formData.vehiculoId} onChange={handleChange} required>
            <option value="">Selecciona un vehículo</option>
            {vehiculos.map(v => (
              <option key={v._id} value={v._id}>{v.marca} {v.modelo} ({v.placa})</option>
            ))}
          </select>

          <button type="submit" className="btn-add">Registrar Reserva</button>
        </form>
      </div>

      <div className="matriculas-list">
        <h3>Lista de Reserva</h3>
        <table>
          <thead>
            <tr>
              <th>Clientes</th>
              <th>Vehiculos</th>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(m => (
              <tr key={m._id}>
                <td>{m.cliente?.nombre} {m.cliente?.apellido}</td>
                <td>{m.vehiculo?.marca} {m.vehiculo?.modelo} ({m.vehiculo?.placa})</td>
                <td>{m.codigo}</td>
                <td>{m.descripcion}</td>
                <td>{m.fecha ? new Date(m.fecha).toLocaleDateString() : ""}</td>
                <td>
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

export default Reserva;
