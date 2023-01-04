import { useContext, useState } from "react";
import { usuarioContext } from "../../context/usuarioContext";
import { BiEditAlt, BiTrash, BiSave } from "react-icons/bi";
import Crear_cuentas from "./CrearCuenta";
import "../../styles/gestion_cuentas.css";
import toast from "react-hot-toast";

const Gestion_cuentas = () => {
  const { users, deleteUser } = useContext(usuarioContext);
  const [edit, setEdit] = useState(false);
  const [usuario, setUsuario] = useState("");
  const handleDelete = (user) => {
    toast((t) => (
      <div>
        <p style={{ fontSize: "22px" }}>
          Seguro de que quieres eliminar el usuario:
          <strong> {user.fullname}</strong>
        </p>
        <div>
          <button
            className="toast-eliminar"
            onClick={() => {
              deleteUser(user.id);
              toast.dismiss(t.id);
            }}
          >
            Eliminar
          </button>
          <button
            className="toast-cancelar"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  };
  return (
    <>
      {edit && <Crear_cuentas usuario={usuario} />}
      {!edit && (
        <div className="gestion-cuentas-container">
          <table className="table">
            <thead>
              <tr>
                <th className="th">Nombre</th>
                <th className="th">Usuario</th>
                <th className="th">Contraseña</th>
                <th className="th">Tipo usuario</th>
                <th className="th">Correo</th>
                <th className="th">Teléfono</th>
                <th className="th">Registro único Tributario</th>
                <th className="th">Acciones</th>
              </tr>
              {users.map((user) => {
                return (
                  <tr className="tr" key={user.id}>
                    <td className="td">{user.fullname}</td>
                    <td className="td">{user.username}</td>
                    <td className="td">{user.password}</td>
                    <td className="td">{user.tipo_usuario}</td>
                    <td className="td">{user.correo}</td>
                    <td className="td">{user.telefono}</td>
                    <td className="td">{user.rut}</td>
                    <td className="td">
                      <div className="botones-container">
                        <button
                          className="boton-edit"
                          onClick={() => {
                            setUsuario(user);
                            setEdit((bool) => !bool);
                          }}
                        >
                          <BiEditAlt />
                          <p className="p-edit">Editar</p>
                        </button>
                        <button
                          className="boton-eliminar"
                          onClick={() => handleDelete(user)}
                        >
                          <BiTrash />
                          <p className="p-eliminar">Eliminar</p>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </thead>
          </table>
        </div>
      )}
    </>
  );
};

export default Gestion_cuentas;
