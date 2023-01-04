import { Router } from "express";
import {
  getPosts,
  createPosts,
  uptdatePosts,
  deletePosts,
  getPost,
  sendPost,
  validatePost,
  oficialPost,
} from "../controllers/posts.controllers.js";
import {
  createFolders,
  getFolders,
  deleteFolder,
  createPermisosFolders,
  getPermisosFolders,
} from "../controllers/folders.controllers.js";
import {
  login,
  createUser,
  getUsers,
  deleteUser,
  editUser,
} from "../controllers/users.controllers.js";
//import { pool } from "../db.js";

const router = Router();

router.post("/login", login); //Verificar que exista la cuenta de usuario y la devuelve
router.post("/createUser", createUser); //Crear usuario
router.get("/users", getUsers); //Obtener usuarios
router.delete("/users/:id", deleteUser); //Eliminar un usuario
router.post("/users/edit", editUser); //Editar un usuario

router.get("/posts", getPosts); //Obtener documentos
router.post("/posts", createPosts); //Crear documento
router.put("/posts/:id", uptdatePosts); //Actualizar documento
router.delete("/posts/:id", deletePosts); //Elimina el documento mediante su id
router.get("/download/:id", getPost); //Descargar documento
router.post("/posts/send", sendPost); //Mover documento
router.post("/posts/validate", validatePost); //Validar documento
router.post("/posts/oficial", oficialPost); //Validar documento volviendolo oficial

router.post("/folders", createFolders); //Crear carpeta
router.get("/folders", getFolders); //Obtener carpetas
router.delete("/folders/:id", deleteFolder); //Eliminar carpeta mediante su id
router.post("/folders/permisos", createPermisosFolders); //Crear permisos de usuario y carpetas
router.get("/folders/permisos", getPermisosFolders); //Obtener permisos de usuario y carpetas

export default router;

// router.get("/ping", async (req, res) => {
//   const [rows] = await pool.query("SELECT 1 + 1 as result");
//   console.log(rows);
//   res.json("ping");
// });
