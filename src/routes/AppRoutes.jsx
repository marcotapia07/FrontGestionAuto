import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Vehiculos from "../pages/Vehiculos";
import Clientes from "../pages/Clientes";
import Reservas from "../pages/Reserva"; 

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/vehiculos" element={<ProtectedRoute><Vehiculos /></ProtectedRoute>} />
      <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
      <Route path="/reservas" element={<ProtectedRoute><Reservas /></ProtectedRoute>} /> 
    </Routes>
  </Router>
);

export default AppRoutes;
