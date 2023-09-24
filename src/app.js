// Código do servidor Node.js que configura o Socket.io
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const socketIo = require("socket.io");

const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));
let storage = [];

io.on("connection", (socket) => {
  console.log("Um usuário se conectou");

  socket.emit("yourId", socket.id);
  socket.emit("storage", storage);

  socket.on("newMSG", (mensagem) => {
    console.log(`Cliente with id ${mensagem.id} diz: ${mensagem.msg}`);
    console.log("ID MENSAGEM ", mensagem.id);
    storage.push(mensagem);
    socket.broadcast.emit("msg", mensagem);
  });

  socket.on("disconnect", () => {
    console.log("Um usuário se desconectou");
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
