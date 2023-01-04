import "./App.css";
import Nav from "./components/menu/Nav";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Unidades from "./pages/Unidades";
import Documentos_oficiales from "./pages/Documentos_oficiales";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/postContext";
import { ShowProvider } from "./context/showContext";
import { AccionesProvider } from "./context/accionesContext";
import { Toaster } from "react-hot-toast";
import Notificaciones from "./pages/Notificaciones";
import Cuenta from "./pages/Cuenta";
import { UsuarioProvider } from "./context/usuarioContext";

function App() {
  return (
    <UsuarioProvider>
      <PostProvider>
        <ShowProvider>
          <AccionesProvider>
            <Routes>
              <Route path="" element={<Login />}></Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/menu" element={<Nav />}></Route>
                <Route path="/unidades" element={<Unidades />}></Route>
                <Route
                  path="/documentos_oficiales"
                  element={<Documentos_oficiales />}
                ></Route>
                <Route
                  path="/notificaciones"
                  element={<Notificaciones />}
                ></Route>
                <Route path="/cuenta" element={<Cuenta />}></Route>
              </Route>

              <Route
                path="*"
                element={<div>No se encontro la pagina</div>}
              ></Route>
            </Routes>
            <Toaster />
          </AccionesProvider>
        </ShowProvider>
      </PostProvider>
    </UsuarioProvider>
  );
}

export default App;
// <div className="App">
//   {/*Autentificado =>
//     header
//     barra lateral
//     vista de archivos
//     iconos
//     */}

//   {/*No autentificado: Iniciar sesion*/}
//   {/* <Login /> */}
//   <Menu />
// </div>
