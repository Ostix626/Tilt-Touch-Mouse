import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const port = 3001;
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

const io = new Server(server, {
  cors: { origin: "http://" },
});

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("test", (data) => {
    console.log(`Received data from ${socket.id}:\n${data}`);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
