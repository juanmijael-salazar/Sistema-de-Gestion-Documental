import MiCuenta from "../components/cuenta/MiCuenta";
import Nav from "../components/menu/Nav";
import { useContext } from "react";
import { showContext } from "../context/showContext";
import CrearCuenta from "../components/cuenta/CrearCuenta";
import { useState } from "react";
import "../styles/cuenta.css";
import Gestion_cuentas from "../components/cuenta/Gestion_cuentas";

function Cuenta() {
  const { showMiCuenta, showGestionarCuentas } = useContext(showContext);
  const [showCrearCuenta, setShowCrearCuenta] = useState(true);
  const [showCuentas, setShowCuentas] = useState(false);
  return (
    <>
      <Nav />
      {showMiCuenta && <MiCuenta />}
      {showGestionarCuentas && (
        <div className="gestionar-cuentas-container">
          <div className="botones-container">
            <button
              className="boton-crearCuenta"
              onClick={() => {
                setShowCrearCuenta(true);
                setShowCuentas(false);
              }}
            >
              Crear cuenta
            </button>
            <button
              className="boton-gestionarCuenta"
              onClick={() => {
                setShowCuentas(true);
                setShowCrearCuenta(false);
              }}
            >
              Gestor de cuentas
            </button>
          </div>
          {showCrearCuenta && <CrearCuenta />}
          {showCuentas && <Gestion_cuentas />}
        </div>
      )}
    </>
  );
}

export default Cuenta;
