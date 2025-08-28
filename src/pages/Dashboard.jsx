import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Bienvenido, {user.nombre}!</h1>
        <button className="btn-logout" onClick={logout}>Salir</button>
      </header>

      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate("/clientes")}>
          <h2>Clientes</h2>
          <p>Gestiona los estudiantes del sistema</p>
        </div>

        <div className="card" onClick={() => navigate("/vehiculos")}>
          <h2>Vehiculos</h2>
          <p>Gestiona los vehiculos disponibles</p>
        </div>

        <div className="card" onClick={() => navigate("/reservas")}>
          <h2>Reservas</h2>
          <p>Gestiona las reservas de vehiculos</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
