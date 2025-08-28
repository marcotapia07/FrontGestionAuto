import axios from "axios";

const API_URL = "https://backexamenfincarrera.onrender.com";

// Login
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error de login");
  }
};

export const registerUser = async (nombre, apellido, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { nombre, apellido, email, password });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error de registro");
  }
};

const getAuthHeaders = () => {
  const auth = JSON.parse(localStorage.getItem("auth")); 
  if (auth?.token) {
    return { headers: { Authorization: `Bearer ${auth.token}` } };
  }
  return {};
};

export const getVehiculos = async () => axios.get(`${API_URL}/vehiculos`, getAuthHeaders());
export const createVehiculos = async (vehiculo) =>
  axios.post(`${API_URL}/vehiculos`, vehiculo, getAuthHeaders());
export const updateVehiculos = async (id, vehiculo) =>
  axios.put(`${API_URL}/vehiculos/${id}`, vehiculo, getAuthHeaders());
export const deleteVehiculo = async (id) =>
  axios.delete(`${API_URL}/vehiculos/${id}`, getAuthHeaders());


export const getClientes = async () => axios.get(`${API_URL}/clientes`, getAuthHeaders());
export const createCliente = async (cliente) =>
  axios.post(`${API_URL}/clientes`, cliente, getAuthHeaders());
export const updateCliente = async (id, cliente) =>
  axios.put(`${API_URL}/clientes/${id}`, cliente, getAuthHeaders());
export const deleteCliente = async (id) =>
  axios.delete(`${API_URL}/clientes/${id}`, getAuthHeaders());


export const getReserva = async () => axios.get(`${API_URL}/reservas`, getAuthHeaders());

export const createReserva = async (reserva) =>
  axios.post(`${API_URL}/reservas`, reserva, getAuthHeaders());
export const deleteReserva = async (id) =>
  axios.delete(`${API_URL}/reservas/${id}`, getAuthHeaders());