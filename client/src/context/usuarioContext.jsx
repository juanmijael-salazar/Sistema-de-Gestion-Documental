import { createContext, useState, useEffect } from "react";
import {
  createUserRequests,
  loginRequests,
  getUsersRequests,
  deleteUserRequests,
  editUserRequests,
} from "../api/accounts";
import { useNavigate } from "react-router-dom";

export const usuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [idPermisos, setIdPermisos] = useState([]);

  const enviarLogin = async (datos) => {
    const res = await loginRequests(datos);
    if (Object.entries(res.data).length == 0) {
      alert("Usuario no encontrado");
    } else {
      setUser(res.data);
      window.localStorage.setItem("sesionLog", JSON.stringify(res.data));
      //console.log(res.data.tipo_usuario);
      navigate("/menu");
    }
  };
  const cerrarSesion = () => {
    setUser(null);
    window.localStorage.setItem("sesionLog", JSON.stringify(null));
    navigate("/");
  };
  const createUser = async (datos) => {
    const res = await createUserRequests(datos); //Solo lo devuelvo para confirmar que se creo bien
    setUsers([...users, res.data]);
  };
  const getUsers = async () => {
    const res = await getUsersRequests();
    setUsers(res.data);

    let idUsers = [];
    res.data.map((user, i) => {
      idUsers[i] = user.id;
    });
    setIdPermisos(idUsers);
  };
  const deleteUser = async (id) => {
    await deleteUserRequests(id);
    setUsers(users.filter((user) => user.id !== id));
  };
  const editUser = async (datos) => {
    await editUserRequests(datos);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <usuarioContext.Provider
      value={{
        user,
        setUser,
        enviarLogin,
        cerrarSesion,
        createUser,
        getUsers,
        users,
        setUsers,
        idPermisos,
        setIdPermisos,
        deleteUser,
        editUser,
      }}
    >
      {children}
    </usuarioContext.Provider>
  );
};
