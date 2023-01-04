import "../../styles/crearCuenta.css";
import { useContext, useState, useEffect } from "react";
import { usuarioContext } from "../../context/usuarioContext";
import toast from "react-hot-toast";

function CrearCuenta(props) {
  const { createUser, editUser } = useContext(usuarioContext);
  const [usuario, setUsuario] = useState("");
  const [contra, setContra] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rut, setRut] = useState("");
  const [tipo, setTipo] = useState("");
  const [editar, setEditar] = useState(false);
  useEffect(() => {
    if (props.usuario?.id) {
      setUsuario(props.usuario.username);
      setContra(props.usuario.password);
      setNombre(props.usuario.fullname);
      setCorreo(props.usuario.correo);
      setTelefono(props.usuario.telefono);
      setRut(props.usuario.rut);
      setTipo(props.usuario.tipo_usuario);
      setEditar(true);
    }
  }, []);

  return (
    <div className="crear-cuenta-container">
      <form
        className="crear-cuenta"
        onSubmit={(e) => {
          e.preventDefault();
          if (!editar) {
            createUser({
              username: usuario,
              password: contra,
              tipo_usuario: tipo,
              fullname: nombre,
              correo,
              telefono,
              rut,
            });
          } else {
            editUser({
              username: usuario,
              password: contra,
              tipo_usuario: tipo,
              fullname: nombre,
              correo,
              telefono,
              rut,
              id: props.usuario.id,
            });
          }
          toast.success("Se creo el usuario exitosamente", {
            style: {
              fontSize: "24px",
            },
            position: "top-right",
            reverseOrder: true,
            duration: 2500,
          });
        }}
      >
        <label>Usuario </label>
        <input
          type="text"
          onChange={(e) => {
            setUsuario(e.target.value);
          }}
          value={usuario}
        />
        <br />
        <label>Contraseña </label>
        <input
          type="text"
          onChange={(e) => {
            setContra(e.target.value);
          }}
          value={contra}
        />
        <br />
        <label>Nombre completo </label>
        <input
          type="text"
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          value={nombre}
        />
        <br />
        <label>
          Tipo usuario<br></br><br></br>
          <strong>
            1:Administrador <br></br>
            2:Auditor <br></br>
            3:Consultor <br></br>
            4:Usuario Interno Reniec <br></br>
            5:Funcionario<br></br><br></br>
          </strong>
        </label>
        <input
          type="number"
          onChange={(e) => {
            setTipo(e.target.value);
          }}
          value={tipo}
        />
        <br />
        <label>Correo </label>
        <input
          type="text"
          onChange={(e) => {
            setCorreo(e.target.value);
          }}
          value={correo}
        />
        <br />
        <label>Telefono </label>
        <input
          type="text"
          onChange={(e) => {
            setTelefono(e.target.value);
          }}
          value={telefono}
        />
        <br />
        <label>Registro único Tributario </label>
        <input
          type="text"
          onChange={(e) => {
            setRut(e.target.value);
          }}
          value={rut}
        />
        <br />
        <button>{editar ? "Guardar" : "Crear usuario"}</button>
      </form>
    </div>
  );
}

export default CrearCuenta;
