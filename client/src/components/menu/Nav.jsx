import "../../styles/nav.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { showContext } from "../../context/showContext";
import { usuarioContext } from "../../context/usuarioContext";
import { BiLogOut } from "react-icons/bi";
function Nav() {
  const navigate = useNavigate();
  const {
    setShowDocumentos,
    setShowOrganigrama,
    showUnidades,
    setShowUnidades,
    showCuenta,
    setShowCuenta,
    setShowMiCuenta,
    setShowGestionarCuentas,
    setShowDocumentosOf,
    setShowDocumentosLocales,
  } = useContext(showContext);
  const { user, cerrarSesion } = useContext(usuarioContext);
  return (
    <div className="container-nav">
      <div className="nav">
        <img src="/src/assets/logo-vertical.png" alt="logo vertical" />
        <hr />
        <div className="nav__seccion">
          <button
            onClick={() => {
              setShowUnidades((bool) => !bool);
            }}
          >
            Unidades
          </button>
          {showUnidades && (
            <div
              style={{
                width: "inherit",
                height: "180px",
                background: "inherit",
              }}
            >
              <button
                className="nav__seccion__subseccion-button"
                onClick={() => {
                  setShowDocumentos(true);
                  setShowOrganigrama(false);
                  setShowDocumentosLocales(false);
                  navigate("/unidades");
                }}
              >
                Mis Unidades
              </button>
              <button
                className="nav__seccion__subseccion-button"
                onClick={() => {
                  setShowOrganigrama(true);
                  setShowDocumentos(false);
                  setShowDocumentosLocales(false);
                  navigate("/unidades");
                }}
              >
                Organigrama
              </button>
              <button
                className="nav__seccion__subseccion-button"
                onClick={() => {
                  setShowDocumentosLocales(true);
                  setShowOrganigrama(false);
                  setShowDocumentos(false);
                  navigate("/unidades");
                }}
              >
                Unidad Local
              </button>
            </div>
          )}
        </div>
        <hr />
        <div className="nav__seccion">
          <button
            onClick={() => {
              setShowDocumentosOf(true);
              navigate("/documentos_oficiales");
            }}
          >
            Documentos
          </button>
        </div>
        <hr />
        <div className="nav__seccion">
          <button
            onClick={() => {
              navigate("/notificaciones");
            }}
          >
            Notificaciones
          </button>
        </div>
        <hr />
        {user.tipo_usuario == 1 && (
          <div className="nav__seccion">
            <button
              onClick={() => {
                //console.log(user.tipo_usuario);
                setShowCuenta((bool) => !bool);
              }}
            >
              Cuenta
            </button>
            {showCuenta && (
              <div
                style={{
                  width: "inherit",
                  height: "120px",
                  background: "inherit",
                }}
              >
                <button
                  className="nav__seccion__subseccion-button"
                  onClick={() => {
                    setShowMiCuenta(true);
                    setShowGestionarCuentas(false);
                    navigate("/cuenta");
                  }}
                >
                  Mi cuenta
                </button>
                <button
                  className="nav__seccion__subseccion-button"
                  onClick={() => {
                    setShowGestionarCuentas(true);
                    setShowMiCuenta(false);
                    navigate("/cuenta");
                  }}
                >
                  Gestor de cuentas
                </button>
              </div>
            )}
          </div>
        )}
        {user.tipo_usuario != 1 && (
          <div className="nav__seccion">
            <button
              onClick={() => {
                setShowMiCuenta(true);
                navigate("/cuenta");
              }}
            >
              Mi cuenta
            </button>
          </div>
        )}

        <hr />


      </div>
      <button
          className="nav__salir"
          onClick={() => {
            setShowDocumentos(false);
            cerrarSesion();
          }}
        >
          <BiLogOut />
        </button>
    </div>
  );
}

export default Nav;
