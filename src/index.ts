import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { MoveData } from "./classes/MoveData";
import {
  getCursorPosition,
  setCursorPosition,
  sendCursorEvent,
  cursorEvents,
} from "node-cursor";

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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

  socket.on("data", (data: MoveData) => {
    console.log(`Received data from ${socket.id}:`);
    console.log(data);

    const { x, y } = getCursorPosition();

    if (data.click) {
      click(x, y);
      return;
    }

    setCursorPosition({ x: data.touch.x0, y: data.touch.y0 });
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

const click = (x: number, y: number) => {
  sendCursorEvent({ event: cursorEvents.LEFT_DOWN, data: 0, x, y });
  sendCursorEvent({ event: cursorEvents.LEFT_UP, data: 0, x, y });
};
