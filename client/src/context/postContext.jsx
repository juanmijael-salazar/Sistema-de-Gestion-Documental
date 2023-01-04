import { useState, useContext, createContext, useEffect } from "react";
import {
  getPostsRequests,
  createPostRequests,
  createFoldersRequests,
  getFoldersRequests,
  getPermisosFoldersRequests,
  createPermisosFoldersRequests,
} from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [folders, setFolders] = useState([]);
  const [ruta, setRuta] = useState([]);
  const [permisosFolders, setPermisosFolders] = useState([]); //Array de registros usuario_carpeta que tiene los permisos a las carpetas

  const getPosts = async () => {
    const res = await getPostsRequests();
    setPosts(res.data);
  };
  const createPost = async (post) => {
    const res = await createPostRequests(post); //Se añade usando el SV y la DB (se demora un poquito, por eso la siguiente linea)
    setPosts([...posts, res.data]); //Se añade mediante estados, no interfiriendo con la DB
  };
  const getFolders = async () => {
    const res = await getFoldersRequests();
    if (res.data.length == 0) {
      console.log("no hay carpetas, creando carpetas raiz...");
      // Crear carpetas
      const res1 = await createFoldersRequests({
        titulo: "RAIZ UNIDADES",
        fk_carpeta: null,
        propietario: null,
      }); //Se añade usando el SV y la DB (se demora un poquito, por eso la siguiente linea)
      const res2 = await createFoldersRequests({
        titulo: "RAIZ OFICIALES",
        fk_carpeta: null,
        propietario: null,
      });
      const res3 = await createFoldersRequests({
        titulo: "RAIZ LOCAL",
        fk_carpeta: null,
        propietario: null,
      });
      //console.log("res1, res2", res1.data, res2.data);
      setFolders([...folders, res1.data, res2.data, res3.data]);
    } else {
      // Hay carpetas, seguir normalmente
      setFolders(res.data);
    }
  };
  const createFolder = async (datos) => {
    const res = await createFoldersRequests(datos[0]); //Se añade usando el SV y la DB (se demora un poquito, por eso la siguiente linea)
    setFolders([...folders, res.data]); //Se añade mediante estados, no interfiriendo con la DB
    if (datos[1] != false) {
      const res2 = await createPermisosFoldersRequests({
        fk_usuarioArray: datos[1],
        fk_carpeta: res.data.id,
      });
      setPermisosFolders([...permisosFolders, res2.data]);
    }
  };
  const getPermisosFolders = async () => {
    const res = await getPermisosFoldersRequests();
    setPermisosFolders(res.data);
  };
  useEffect(() => {
    getPosts();
    getFolders();
    getPermisosFolders();
  }, []);

  return (
    <postContext.Provider
      value={{
        posts,
        setPosts,
        getPosts,
        createPost,
        getFolders,
        folders,
        setFolders,
        createFolder,
        ruta,
        setRuta,
        permisosFolders,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
