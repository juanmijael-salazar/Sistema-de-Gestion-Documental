import Nav from "../components/menu/Nav";
import Documentos_ofc from "../components/documentos_oficiales/Documentos_ofc";
import Acciones_ofc from "../components/documentos_oficiales/Acciones_ofc";
import { useContext } from "react";
import { showContext } from "../context/showContext";

function Documentos_oficiales() {
  const { showDocumentosOf } = useContext(showContext);
  return (
    <>
      <Nav />
      {showDocumentosOf && <Documentos_ofc />}
      {showDocumentosOf && <Acciones_ofc />}
    </>
  );
}

export default Documentos_oficiales;
