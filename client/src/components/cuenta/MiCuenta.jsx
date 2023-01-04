import "../../styles/miCuenta.css";
import { usuarioContext } from "../../context/usuarioContext";
import { useContext } from "react";
function MiCuenta() {
  const { user } = useContext(usuarioContext);
  return (
    <div className="cuenta-container">
      <h1 className="cuenta">
        Usuario: {user.username} <br />
        <hr className="hrv2" />
        <br />
        Correo: {user.correo} <br />
        <hr className="hrv2" />
        <br />
        Nombre completo: {user.fullname} <br />
        <hr className="hrv2" />
        <br />
        Telefono: {user.telefono} <br />
        <hr className="hrv2" />
        <br />
        Rut: {user.rut} <br />
        <hr className="hrv2" />
        <br />
        Tipo de usuario:{" "}
        {user.tipo_usuario == 1
          ? "Admin"
          : user.tipo_usuario == 2
          ? "Director"
          : user.tipo_usuario == 3
          ? "Secretaria"
          : user.tipo_usuario == 4
          ? "Academico"
          : "Funcionario"}
        <hr className="hrv2" />
      </h1>
    </div>
  );
}

export default MiCuenta;
