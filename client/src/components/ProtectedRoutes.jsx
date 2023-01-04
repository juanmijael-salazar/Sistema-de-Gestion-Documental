import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { usuarioContext } from "../context/usuarioContext";
function ProtectedRoutes({ children }) {
  //Todavia no usa childrens
  const { user, setUser } = useContext(usuarioContext);
  const [showCarga, setShowCarga] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem("sesionLog"));
    if (loggedUser) {
      setUser(loggedUser);
      console.log("entra");
    } else {
      setShowCarga(false);
      console.log("no loggedUser");
    }
  }, []);
  return user ? <Outlet /> : showCarga ? "..." : <Navigate to="/" />;
}

export default ProtectedRoutes;
