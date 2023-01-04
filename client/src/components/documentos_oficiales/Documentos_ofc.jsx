import { useState, useContext, useEffect } from "react";
import { accionesContext } from "../../context/accionesContext";
import { usePosts } from "../../context/postContext.jsx";
import { usuarioContext } from "../../context/usuarioContext";
import "../../styles/documentos.css";

function Documentos_ofc() {
  const { posts, ruta, folders, setRuta, createFolder, createPost } =
    usePosts();
  const { user } = useContext(usuarioContext);
  const { setPostSelect, setFolderSelect, setTypeHandler } =
    useContext(accionesContext);
  const [titulo, setTitulo] = useState("");
  const [archivo, setArchivo] = useState(null);

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
    console.log("asd", folders[1]?.id);
    setRuta([folders[1]?.id]);
    console.log("ruta", ruta);
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
        <p className="documentos-header__ultima-modificacion">Fecha creado</p>
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
                  setRuta([...ruta, folder.id]);
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
          if (post.fk_carpeta == ruta[ruta.length - 1] || post.oficial == 1) {
            return (
              <div
                className={"documentos-item"}
                onClick={() => {
                  setPostSelect(post);
                  setTypeHandler("post");
                }}
                key={post.id}
              >
                <img
                  src="/src/assets/iconos/imagenes.png"
                  alt="carpeta"
                  style={{ height: "18px", marginLeft: "10px" }}
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
      {user.tipo_usuario == 1 &&
        (user.tipo_usuario == 2 || ruta[ruta.length - 1] != 1) && (
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
                    false,
                  ]);

                  e.target.reset(); //e.target = form
                }}
              >
                <input
                  type="text"
                  placeholder="Nombre carpeta"
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <button>Aceptar</button>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}
export default Documentos_ofc;
