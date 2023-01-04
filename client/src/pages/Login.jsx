import React, { useState, useContext } from "react";
import "../styles/login.css";
import { usuarioContext } from "../context/usuarioContext";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contra, setContra] = useState("");
  const { enviarLogin } = useContext(usuarioContext);

  return (
    <div className="Container-login">
      <div className="Login">
        <img
          className="Login__img"
          src="/src/assets/logo-horizontal.png"
          alt="Logo"
        />
        <form className="Login__form">
          <input
            type="text"
            placeholder="Usuario"
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setContra(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              enviarLogin({ username: usuario, password: contra });
            }}
          >
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
