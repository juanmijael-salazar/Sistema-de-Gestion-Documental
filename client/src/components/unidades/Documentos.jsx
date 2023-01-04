import { useState, useContext, useEffect } from "react";
import { accionesContext } from "../../context/accionesContext";
import { usuarioContext } from "../../context/usuarioContext";
import { usePosts } from "../../context/postContext.jsx";
import "../../styles/documentos.css";
import Usuarios from "../cuenta/Usuarios";
import toast from "react-hot-toast";

function Documentos() {
  const {
    posts,
    createPost,
    folders,
    createFolder,
    ruta,
    setRuta,
    permisosFolders,
  } = usePosts();
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const { setPostSelect, setFolderSelect, setTypeHandler } =
    useContext(accionesContext);
  const { user, idPermisos } = useContext(usuarioContext);
  const [showCrearCarpeta, setShowCrearCarpeta] = useState(false);
  const [showUsuarios, setShowUsuarios] = useState(false);

  const handleDate = (time) => {
    let dateFormat = new Date(time);
    let date =
      dateFormat.getDate() +
      "/" +
      (dateFormat.getMonth() + 1) +
      "/" +
      dateFormat.getFullYear() +
      " " +
      dateFormat.getHours() +
      ":" +
      dateFormat.getMinutes() +
      ":" +
      dateFormat.getSeconds();
    return date;
  };
  useEffect(() => {
    console.log(folders[0].id);
    setRuta([folders[0].id]);
  }, []);

  return (
    <div className="documentos-container">
      <p
        className="documentos-ruta"
        onClick={() =>
          setRuta(ruta.filter((direc) => direc !== ruta[ruta.length - 1]))
        }
      >
        {ruta.map((direc, i) => {
          if (i != 0) {
            return folders.map((folder) => {
              if (folder.id == direc && i == 1) {
                return folder.titulo;
              } else if (folder.id == direc) {
                return " > " + folder.titulo;
              }
            });
          }
        })}{" "}
      </p>
      <hr />
      <div className="documentos-header">
        <p className="documentos-header__nombre">Nombre</p>
        <p className="documentos-header__propietario">Propietario</p>
        <p className="documentos-header__ultima-modificacion">
          {" "}
          Fecha creacion
        </p>
      </div>
      <hr />
      <div className="folders">
        {folders.map((folder) => {
          if (folder.fk_carpeta == ruta[ruta.length - 1]) {
            return (
              <div
                className="documentos-item"
                onClick={() => {
                  setFolderSelect(folder);
                  setTypeHandler("folder");
                }}
                onDoubleClick={() => {
                  let permisos = permisosFolders.filter(
                    (permiso) => permiso.fk_carpeta == folder.id
                  );
                  if (
                    permisos.find((permiso) => permiso.fk_usuario == user.id)
                  ) {
                    setRuta([...ruta, folder.id]);
                  } else if (permisos.length == 0) {
                    setRuta([...ruta, folder.id]);
                  } else toast.error("Usuario no autorizado");
                }}
                key={folder.id}
              >
                <img
                  src="/src/assets/iconos/carpeta.png"
                  alt="imagen"
                  style={{ height: "30px", width: "36px" }}
                ></img>
                <p style={{ width: "37%", textIndent: "5px" }}>
                  {folder.titulo}
                </p>
                <p style={{ width: "43%", textAlign: "left" }}>
                  {folder.propietario_usuarioFK}
                </p>
                <p
                  style={{
                    width: "20%",
                    textAlign: "right",
                    paddingRight: "10px",
                  }}
                >
                  {handleDate(folder.creado)}
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="documentos">
        {posts.map((post) => {
          if (post.fk_carpeta == ruta[ruta.length - 1]) {
            return (
              <div
                className={
                  post.validado == 1 || post.oficial == 1
                    ? post.oficial == 1
                      ? "documentos-item-oficial"
                      : "documentos-item-validado"
                    : "documentos-item"
                }
                onClick={() => {
                  setPostSelect(post);
                  setTypeHandler("post");
                }}
                key={post.id}
              >
                <img
                  src="/src/assets/iconos/word.png"
                  alt="word"
                  style={{
                    height: "20px",
                    marginLeft: "3px",
                    marginTop: "2px",
                  }}
                ></img>
                <p style={{ width: "37%", textIndent: "5px" }}>{post.titulo}</p>
                <p style={{ width: "43%", textAlign: "left" }}>
                  {post.propietario_usuarioFK}
                </p>
                <p
                  style={{
                    width: "20%",
                    textAlign: "right",
                    paddingRight: "10px",
                  }}
                >
                  {handleDate(post.creado)}
                </p>
              </div>
            );
          }
        })}
      </div>
      {(ruta[ruta.length - 1] != folders[0].id || user.tipo_usuario == 1) && (
        <div>
          <form
            className="form-documentos"
            onSubmit={(e) => {
              e.preventDefault();
              createPost({
                archivo,
                fk_carpeta: ruta[ruta.length - 1],
                id_usuario: user.id,
              });
              e.target.reset(); //e.target = form
            }}
          >
            <input
              type="file"
              name="archivo"
              onChange={(e) => setArchivo(e.target.files[0])}
            />
            <button>Guardar</button>
          </form>
          <button className="crear_carpeta"
            onClick={() => {
              setShowCrearCarpeta(true);
            }}
          >
            Crear carpeta
          </button>
          {showCrearCarpeta && (
            <div className="form-carpetas-container">
              <form
                className="form-carpetas"
                onSubmit={(e) => {
                  e.preventDefault();
                  createFolder([
                    {
                      titulo,
                      fk_carpeta: ruta[ruta.length - 1],
                      id_usuario: user.id,
                    },
                    idPermisos,
                  ]);
                  setShowCrearCarpeta(false);
                  e.target.reset(); //e.target = form
                }}
              >
                <input
                  type="text"
                  placeholder="Nombre carpeta"
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUsuarios((bool) => !bool);
                  }}
                >
                  Permisos usuarios
                </button>
                {showUsuarios && <Usuarios />}
                <button>Aceptar</button>
              </form>
            </div>
          )}
          {/* <form
            className="form-carpetas"
            onSubmit={(e) => {
              e.preventDefault();
              createFolder({ titulo, fk_carpeta: ruta[ruta.length - 1] });
              e.target.reset(); //e.target = form
            }}
          >
            <input
              type="text"
              placeholder="Nombre carpeta"
              onChange={(e) => setTitulo(e.target.value)}
            />
            <button>Crear carpeta</button>
          </form> */}
        </div>
      )}
    </div>
  );
}

export default Documentos;
