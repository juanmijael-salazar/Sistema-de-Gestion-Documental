import { pool } from "../db.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE username = ? AND password = ?",
      [username, password]
    );
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      tipo_usuario,
      fullname,
      correo,
      telefono,
      rut,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO usuarios (username, password, tipo_usuario, fullname, correo, telefono, rut) VALUES (?,?,?,?,?,?,?)",
      [username, password, tipo_usuario, fullname, correo, telefono, rut]
    );
    const [result2] = await pool.query("SELECT * FROM usuarios WHERE id=?", [
      result.insertId,
    ]);
    res.json(result2[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios ORDER BY id ASC");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ? ", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado para eliminar" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const editUser = async (req, res) => {
  try {
    const {
      username,
      password,
      tipo_usuario,
      fullname,
      correo,
      telefono,
      rut,
      id,
    } = req.body;
    await pool.query(
      "UPDATE usuarios SET username=?, password=?, tipo_usuario=?, fullname=?, correo=?, telefono=?, rut=? WHERE id=?",
      [username, password, tipo_usuario, fullname, correo, telefono, rut, id]
    );
    const [result2] = await pool.query("SELECT * FROM usuarios WHERE id=?", [
      id,
    ]);
    res.json(result2[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
