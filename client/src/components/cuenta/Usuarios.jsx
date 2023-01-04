import "../../styles/usuarios.css";
import { useContext } from "react";
import { usuarioContext } from "../../context/usuarioContext";
const Usuarios = () => {
  const { users, setIdPermisos } = useContext(usuarioContext);
  let idUsers = [];
  users.map((user, i) => {
    idUsers[i] = user.id;
  });

  const handleCheckBox = (id) => {
    if (idUsers.find((idUser) => idUser == id)) {
      idUsers = idUsers.filter((idUser) => idUser != id);
      console.log(idUsers);
    } else {
      idUsers.push(id);
      console.log(idUsers);
    }
    setIdPermisos(idUsers);
  };
  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <p className="usuarios-header_nombre">
          <strong>Nombre</strong>
        </p>
        <p className="usuarios-header_seleccionado">
          <strong>Seleccionado</strong>
        </p>
      </div>
      <div className="usuarios">
        {users.map((user) => {
          return (
            <div className="usuario-item" key={user.id}>
              <p>{user.fullname}</p>
              <input
                type="checkbox"
                onChange={() => {
                  handleCheckBox(user.id);
                }}
                defaultChecked
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Usuarios;
