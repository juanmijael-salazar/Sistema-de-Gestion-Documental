import axios from "axios";

export const loginRequests = async (datos) =>
  await axios.post("http://localhost:4000/login", datos);
export const createUserRequests = async (datos) =>
  await axios.post("http://localhost:4000/createUser", datos);
export const getUsersRequests = async () =>
  await axios.get("http://localhost:4000/users");
export const deleteUserRequests = async (id) =>
  await axios.delete("http://localhost:4000/users/" + id);
export const editUserRequests = async (datos) =>
  await axios.post("http://localhost:4000/users/edit", datos);
