import express from "express";
import postRoutes from "./routes/posts.routes.js";
import cors from "cors";
import multer from "multer";
import { Server as SocketServer } from "socket.io";
import http from "http";

const app = express(); //aplicacion servidor de express
const server = http.createServer(app); //Convertirlo a servidor http
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
}); //Se crea el server socket pasandole el servidor http antes creado y configurando las entreadas origin: "http://127.0.0.1:5173"
const port = 4000;
//middlewares
app.use(express.json()); //procesar los datos del cliente (si es json)
app.use(cors()); //areggla el error de seguridad cors, se puede especificar que paginas queremos darle permisos
app.use(multer({ dest: "./server/subido" }).single("archivo"));
//rutas
app.use(postRoutes);
//io
io.on("connection", (socket) => {
  console.log("Se conecto socket.io con el usuario", socket.id);
  socket.on("message", (message, user) => {
    socket.broadcast.emit("message", message, user);
    console.log(message);
  });
});

server.listen(port);
console.log("Server in running port:", port);
