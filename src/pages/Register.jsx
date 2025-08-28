import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Login.css"; 

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(nombre, apellido, email, clave);
      alert("Usuario registrado correctamente. Ahora ingresa.");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
          <button type="submit" className="btn-register">Registrarse</button>
        </form>
        <p className="register-link">
          ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
