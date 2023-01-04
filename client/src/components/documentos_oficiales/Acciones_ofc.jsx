import "../../styles/acciones.css";
import { useContext } from "react";
import toast from "react-hot-toast";
import { accionesContext } from "../../context/accionesContext";
import { usePosts } from "../../context/postContext";
import { usuarioContext } from "../../context/usuarioContext";
function Acciones_ofc() {
  const {
    postSelect,
    deletePost,
    downloadPost,
    typeHandler,
    folderSelect,
    deleteFolder,
  } = useContext(accionesContext);
  const { user } = useContext(usuarioContext);
  const { ruta, setRuta } = usePosts();

  const handleDelete = (post) => {
    toast((t) => (
      <div>
        <p style={{ fontSize: "1.4em" }}>
          Seguro de que quieres eliminar{" "}
          {typeHandler == "post" ? "el documento?" : "la carpeta"}{" "}
          <strong>{post.titulo}</strong>
        </p>
        <div>
          <button
            className="toast-eliminar"
            onClick={() => {
              if (typeHandler == "post") {
                deletePost(post.id);
              } else {
                deleteFolder(post.id);
              }

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
      <div className="acciones-containter">
        <button
          onClick={() => {
            if (typeHandler == "post") {
              console.log("no implementado");
            } else {
              setRuta([...ruta, folderSelect.id]);
            }
          }}
        >
          Abrir
        </button>
        {/* {user.tipo_usuario == 1 && <button>Editar</button>} */}

        <button
          onClick={() => {
            if (typeHandler == "post") {
              downloadPost(postSelect.id);
            } else {
              console.log("Aun no implementado");
            }
          }}
        >
          Descargar
        </button>
        {user.tipo_usuario == 1 && (
          <button
            onClick={() => {
              if (typeHandler == "post") {
                handleDelete(postSelect);
              } else {
                handleDelete(folderSelect);
              }
            }}
          >
            Eliminar
          </button>
        )}
      </div>
      ;
    </>
  );
}

export default Acciones_ofc;
