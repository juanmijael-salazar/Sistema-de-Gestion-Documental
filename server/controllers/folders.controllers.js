import { pool } from "../db.js";
import fs from "fs-extra";
export const createFolders = async (req, res) => {
  try {
    const { titulo, fk_carpeta, id_usuario } = req.body;
    const [result] = await pool.query(
      "INSERT INTO carpetas (titulo, fk_carpeta, propietario_usuarioFK) VALUES (?,?,?)",
      [titulo, fk_carpeta, id_usuario]
    ); //Lo sisguien se realiza para obtener el atributo creado del documento y poder mandarselo al cliente y este no tenga que recargar pagina para verlo
    const [result2] = await pool.query("SELECT * FROM carpetas WHERE id=?", [
      result.insertId,
    ]);
    const [result3] = await pool.query("SELECT * FROM usuarios WHERE id=?", [
      id_usuario,
    ]);
    res.json({
      id: result.insertId,
      titulo: titulo,
      creado: result2[0].creado,
      fk_carpeta: fk_carpeta,
      propietario_usuarioFK: result3[0].fullname,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFolders = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM carpetas ORDER BY creado ASC"
    );
    const [result2] = await pool.query("SELECT * FROM usuarios");
    //console.log(result2);
    result.forEach((post) => {
      //result2.forEach((post2) => console.log(post2.id));
      post.propietario_usuarioFK = result2.filter(
        (user) => user.id == post.propietario_usuarioFK
      )[0].fullname;
    });
    res.json(result); //result tiene los registros (arreglo de objetos)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteFolder = async (req, res) => {
  //Llega el id de la carpeta como params.id
  try {
    let eliminarCarpetas = async (fk_id) => {
      const [carpetas] = await pool.query(
        "SELECT * FROM carpetas WHERE fk_carpeta= (?)",
        [fk_id]
      );
      //console.log(carpetas.length);
      if (carpetas.length > 0) {
        for (const carpeta of carpetas) {
          await eliminarCarpetas(carpeta.id);
        }
      }
      //console.log("Se esta elminando la carpeta", fk_id);
      const [result2] = await pool.query(
        "SELECT * FROM documentos WHERE fk_carpeta = (?)",
        [fk_id]
      );
      await pool.query("DELETE FROM documentos WHERE fk_carpeta=?", [fk_id]);
      for (const documento of result2) {
        //console.log(documento.path_documento);
        await fs.remove(documento.path_documento);
      }
      const [result] = await pool.query("DELETE FROM carpetas WHERE id=?", [
        fk_id,
      ]);
      //console.log("Se elimino la carpeta: ", fk_id);
      await pool.query("DELETE FROM usuario_carpeta WHERE fk_carpeta = ?", [
        fk_id,
      ]);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Carpeta no encontrada para eliminar" });
      }
    };
    await eliminarCarpetas(req.params.id);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createPermisosFolders = async (req, res) => {
  try {
    const { fk_usuarioArray, fk_carpeta } = req.body;
    fk_usuarioArray.map(async (fk_usuario) => {
      await pool.query(
        "INSERT INTO usuario_carpeta (fk_usuario, fk_carpeta) VALUES (?, ?)",
        [fk_usuario, fk_carpeta]
      );
    });
    const [result] = await pool.query(
      "SELECT * FROM usuario_carpeta WHERE fk_carpeta = ?",
      [fk_carpeta]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getPermisosFolders = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuario_carpeta");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
