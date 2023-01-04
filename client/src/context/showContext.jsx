import { createContext, useState } from "react";

export const showContext = createContext(); //Intermediario para que los demas componentes puedan usar el contexto

//Provee la informacion a todos sus hijos
export const ShowProvider = ({ children }) => {
  const [showUnidades, setShowUnidades] = useState(false);
  const [showDocumentos, setShowDocumentos] = useState(false); //variable bool que se usara para mostrar Mis unidades
  const [showOrganigrama, setShowOrganigrama] = useState(false);
  const [showCuenta, setShowCuenta] = useState(false);
  const [showMiCuenta, setShowMiCuenta] = useState(false);
  const [showGestionarCuentas, setShowGestionarCuentas] = useState(false);
  const [showDocumentosOf, setShowDocumentosOf] = useState(false);
  const [showDocumentosLocales, setShowDocumentosLocales] = useState(false);
  return (
    <showContext.Provider
      value={{
        showUnidades,
        setShowUnidades,
        showDocumentos,
        setShowDocumentos,
        showOrganigrama,
        setShowOrganigrama,
        showCuenta,
        setShowCuenta,
        showMiCuenta,
        setShowMiCuenta,
        showDocumentosOf,
        setShowDocumentosOf,
        setShowDocumentosLocales,
        showDocumentosLocales,
        showGestionarCuentas,
        setShowGestionarCuentas,
      }}
    >
      {children}
    </showContext.Provider>
  );
};
