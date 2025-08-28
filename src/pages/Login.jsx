import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(email, clave); 
      login(userData); 
      navigate("/dashboard");
    } catch (err) {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>

        <p>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
