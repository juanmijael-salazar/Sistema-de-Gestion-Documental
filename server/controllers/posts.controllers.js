import { pool } from "../db.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM documentos ORDER BY creado ASC"
    );
    const [result2] = await pool.query("SELECT * FROM usuarios");
    result.forEach((post) => {
      post.propietario_usuarioFK = result2.filter(
        (user) => user.id == post.propietario_usuarioFK
      )[0].fullname;
    });
    res.json(result); //result tiene los registros (arreglo de objetos)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  try {
    const { fk_carpeta, id_usuario } = req.body;
    const [result] = await pool.query(
      "INSERT INTO documentos (titulo, path_documento, fk_carpeta, propietario_usuarioFK) VALUES (?,?,?,?)",
      [req.file.originalname, req.file.path, fk_carpeta, id_usuario]
    ); //Lo sisguien se realiza para obtener el atributo creado del documento y poder mandarselo al cliente y este no tenga que recargar pagina para verlo
    const [result2] = await pool.query("SELECT * FROM documentos WHERE id=?", [
      result.insertId,
    ]);
    const [result3] = await pool.query("SELECT * FROM usuarios WHERE id=?", [
      id_usuario,
    ]);
    //console.log(req.file, fk_carpeta);
    res.json({
      id: result.insertId,
      titulo: req.file.originalname,
      creado: result2[0].creado,
      fk_carpeta: fk_carpeta,
      propietario_usuarioFK: result3[0].fullname,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uptdatePosts = async (req, res) => {
  try {
    const { titulo } = req.body;
    const result = await pool.query("UPDATE documentos SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePosts = async (req, res) => {
  try {
    const [result2] = await pool.query(
      "SELECT * FROM documentos WHERE id = (?)",
      [req.params.id]
    );
    const [result] = await pool.query("DELETE FROM documentos WHERE id = (?)", [
      req.params.id,
    ]);
    await fs.remove(result2[0].path_documento);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Documento no encontrado para eliminar" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM documentos WHERE id = (?)",
      [req.params.id]
    );
    res.download(result[0].path_documento, result[0].titulo, function (err) {
      if (err) {
        console.log("Error : ", err);
      } else {
        console.log("Descargando...", result[0].path_documento);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const sendPost = async (req, res) => {
  try {
    const { id, fk_carpeta } = req.body;
    await pool.query("UPDATE documentos SET fk_carpeta = ? WHERE id = ?", [
      fk_carpeta,
      id,
    ]);
    const [result] = await pool.query("SELECT * FROM documentos WHERE id = ?", [
      id,
    ]);
    // const [result2] = await pool.query("SELECT * FROM usuarios");
    // result.forEach((post) => {
    //   post.propietario_usuarioFK = result2.filter(
    //     (user) => user.id == post.propietario_usuarioFK
    //   )[0].fullname;
    // });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const validatePost = async (req, res) => {
  try {
    const { id } = req.body;
    await pool.query("UPDATE documentos SET validado = 1 WHERE id= ?", [id]);
    const [result] = await pool.query("SELECT * FROM documentos WHERE id=?", [
      id,
    ]);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const oficialPost = async (req, res) => {
  try {
    const { id } = req.body;
    await pool.query("UPDATE documentos SET oficial = 1 WHERE id= ?", [id]);
    const [result] = await pool.query("SELECT * FROM documentos WHERE id=?", [
      id,
    ]);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// export const getPost = async (req, res) => {
//   try {
//     const [result] = await pool.query(
//       "SELECT * FROM documentos WHERE id = (?)",
//       [req.params.id]
//     );
//     if (result.length === 0) {
//       return res.status(404).json({ message: "Documento no encontrado" });
//     }
//     res.json(result[0]);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
