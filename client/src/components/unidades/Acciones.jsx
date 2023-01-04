import "../../styles/acciones.css";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { accionesContext } from "../../context/accionesContext";
import { usuarioContext } from "../../context/usuarioContext";
import { usePosts } from "../../context/postContext";
function Acciones() {
  const {
    postSelect,
    deletePost,
    downloadPost,
    typeHandler,
    folderSelect,
    deleteFolder,
    sendPost,
    validatePost,
    oficialPost,
  } = useContext(accionesContext);
  const { ruta, setRuta, permisosFolders, folders } = usePosts();
  const { user } = useContext(usuarioContext);
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
  const carpeta = () => {
    let carpetaR;
    ruta.map((direc, i) => {
      if (direc != 0) {
        folders.map((folder) => {
          if (folder.id == direc) {
            carpetaR = folder;
          }
        });
      }
    });
    return carpetaR;
  };
  const [moverBool, setMoverBool] = useState(false);
  const [postSend, setPostSend] = useState(null);
  const handleSend = (post) => {
    setMoverBool(!moverBool);
    if (moverBool) {
      sendPost({ id: postSend.id, fk_carpeta: carpeta().id });
      toast.success("Se movio a: " + carpeta().titulo, {
        style: {
          fontSize: "20px",
        },
        position: "bottom-center",
      });
    } else {
      setPostSend(post);
      toast((t) => (
        <div>
          <p style={{ fontSize: "25px" }}>Dirijase a la carpeta destino</p>
          <p style={{ fontSize: "18px" }}>
            Archivo:
            <strong>{post.titulo}</strong>
          </p>
        </div>
      ));
    }
  };

  return (
    <>
      <div className="acciones-containter">
        <button
          onClick={() => {
            if (typeHandler == "post") {
              console.log("no implementado");
            } else {
              let permisos = permisosFolders.filter(
                (permiso) => permiso.fk_carpeta == folderSelect.id
              );
              if (permisos.find((permiso) => permiso.fk_usuario == user.id)) {
                setRuta([...ruta, folderSelect.id]);
              } else if (permisos.length == 0) {
                setRuta([...ruta, folderSelect.id]);
              } else toast.error("Usuario no autorizado");
            }
          }}
        >
          Abrir
        </button>
        {/* <button>Editar</button> */}
        {user.tipo_usuario < 3 && (
          <button
            onClick={() => {
              validatePost({ id: postSelect.id });
              if (user.tipo_usuario == 1) {
                oficialPost({ id: postSelect.id });
              }
            }}
          >
            Validar
          </button>
        )}
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
        <button
          onClick={() => {
            if (!moverBool) {
              if (typeHandler == "post") {
                handleSend(postSelect);
              } else {
                console.log("Aun no implementado");
              }
            } else {
              handleSend(postSelect);
            }
          }}
        >
          {moverBool ? "Mover a:" + carpeta().titulo : "Mover a"}
        </button>
        {user.tipo_usuario < 4 && (
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
        {/* <button
          onClick={() => {
            console.log("folders: ", folders);
          }}
        >
          Notificar
        </button> */}
      </div>
      ;
    </>
  );
}

export default Acciones;
