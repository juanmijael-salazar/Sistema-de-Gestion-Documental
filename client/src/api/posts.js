import axios from "axios";

export const getPostsRequests = async () =>
  await axios.get("http://localhost:4000/posts"); //esto es asi por el proxy, sino tendria que ser http://localhost:4000/posts
export const createPostRequests = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  return await axios.post("http://localhost:4000/posts", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deletePostRequests = async (id) =>
  await axios.delete("http://localhost:4000/posts/" + id);
export const downloadPostRequests = async (id) =>
  await axios.get("http://localhost:4000/download/" + id);
export const sendPostRequests = async (datos) =>
  await axios.post("http://localhost:4000/posts/send", datos); //datos tiene id y fk_carpeta
export const validatePostRequests = async (id) =>
  await axios.post("http://localhost:4000/posts/validate", id);
export const oficialPostRequests = async (id) =>
  await axios.post("http://localhost:4000/posts/oficial", id);

//CARPETAS
export const getFoldersRequests = async () =>
  await axios.get("http://localhost:4000/folders");
export const createFoldersRequests = async (folder) =>
  await axios.post("http://localhost:4000/folders", folder);
export const deleteFolderRequests = async (id) =>
  await axios.delete("http://localhost:4000/folders/" + id);
export const getPermisosFoldersRequests = async () =>
  await axios.get("http://localhost:4000/folders/permisos");
export const createPermisosFoldersRequests = async (datos) =>
  await axios.post("http://localhost:4000/folders/permisos", datos);
