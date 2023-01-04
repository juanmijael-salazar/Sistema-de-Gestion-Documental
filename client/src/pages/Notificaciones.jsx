import Nav from "../components/menu/Nav";
import "../styles/notificaciones.css";
import { useState, useEffect, useContext } from "react";
import { usuarioContext } from "../context/usuarioContext";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function Notificaciones() {
  const { user, users } = useContext(usuarioContext);
  const [showUsuarios, setShowUsuarios] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const receiveMessage = (message, user) => {
      console.log(message, user);
    };
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  return (
    <>
      <Nav />
      <div className="notificaciones-container">
        <form
          id="form-notificacion"
          className="form-enviar-notificacion"
          onSubmit={(e) => {
            e.preventDefault();
            socket.emit("message", message, user);
            setMessage("");
          }}
        >
          <label>Hacer una notificacion</label>

          <textarea
            cols="30"
            rows="8"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
          <div className="boton-container">
            <button
              className="boton-receptor-notificacion"
              onClick={() => setShowUsuarios((bool) => !bool)}
            >
              Elegir destinatario
            </button>
            <button
              form="form-notificacion"
              className="boton-enviar-notificacion"
            >
              Enviar
            </button>
          </div>
          {showUsuarios && (
            <div className="usuarios">
              {users.map((user) => {
                return (
                  <div className="usuario-item" key={user.id}>
                    <p>{user.fullname}</p>
                    <input
                      type="checkbox"
                      // onChange={() => {
                      //   handleCheckBox(user.id);
                      // }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </form>
        <div className="notificaciones">Notificaciones</div>
      </div>
    </>
  );
}

export default Notificaciones;
