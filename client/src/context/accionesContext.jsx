import { createContext, useState } from "react";
import {
  deletePostRequests,
  downloadPostRequests,
  deleteFolderRequests,
  sendPostRequests,
  validatePostRequests,
  oficialPostRequests,
} from "../api/posts.js";
import { usePosts } from "../context/postContext.jsx";

export const accionesContext = createContext();

export const AccionesProvider = ({ children }) => {
  const [postSelect, setPostSelect] = useState(null);
  const { posts, setPosts, folders, setFolders } = usePosts();
  const [folderSelect, setFolderSelect] = useState(null);
  const [typeHandler, setTypeHandler] = useState(null);

  const deletePost = async (id) => {
    await deletePostRequests(id); //No se utiliza res ya que el backend no nos entrega mas que solo si se pudo o no realizar el delete
    setPosts(posts.filter((post) => post.id !== id)); //Se añade mediante estados, no interfiriendo con la DB
  };
  const downloadPost = async (id) => {
    //await downloadPostRequests(id);
    window.open("http://localhost:4000/download/" + id);
  };
  const sendPost = async (datos) => {
    //datos tiene id y fk_Carpeta
    const res = await sendPostRequests(datos);

    posts.map((post) => {
      if (post.id == res.data.id) {
        post.fk_carpeta = res.data.fk_carpeta;
      }
    });
    setPosts([...posts]);
  };
  const validatePost = async (id) => {
    const res = await validatePostRequests(id);
    posts.map((post) => {
      if (post.id == res.data.id) {
        post.validado = res.data.validado;
      }
    });
    setPosts([...posts]);
  };
  const oficialPost = async (id) => {
    const res = await oficialPostRequests(id);
    posts.map((post) => {
      if (post.id == res.data.id) {
        post.oficial = res.data.oficial;
      }
    });
    setPosts([...posts]);
  };

  const deleteFolder = async (id) => {
    await deleteFolderRequests(id);
    setFolders(folders.filter((folder) => folder.id !== id));
  };
  return (
    <accionesContext.Provider
      value={{
        postSelect,
        setPostSelect,
        deletePost,
        downloadPost,
        setFolderSelect,
        folderSelect,
        typeHandler,
        setTypeHandler,
        deleteFolder,
        sendPost,
        validatePost,
        oficialPost,
      }}
    >
      {children}
    </accionesContext.Provider>
  );
};
