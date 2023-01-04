import Nav from "../components/menu/Nav";
import Documentos from "../components/unidades/Documentos";
import Acciones from "../components/unidades/Acciones";
import Organigrama from "../components/unidades/Organigrama";
import Documentos_Locales from "../components/unidades/Documentos_Locales";
import { useContext } from "react";
import { showContext } from "../context/showContext";

function Unidades() {
  const { showDocumentos, showOrganigrama, showDocumentosLocales } =
    useContext(showContext);
  return (
    <>
      <Nav />
      {showDocumentos && <Documentos />}
      {showDocumentos && <Acciones />}
      {showOrganigrama && <Organigrama />}
      {showDocumentosLocales && <Documentos_Locales />}
      {showDocumentosLocales && <Acciones />}
    </>
  );
}

export default Unidades;
