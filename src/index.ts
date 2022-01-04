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

let X0: number;
let Y0: number;

const io = new Server(server, {
  cors: { origin: "ws://" },
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

    if (data.touch.numberActiveTouches == 0) {
      X0 = x;
      Y0 = y;
    }

    if(data.touch.numberActiveTouches == 1){
      setCursorPosition({
        x: X0 + Math.round(data.touch.dx * 2.1),
        y: Y0 + Math.round(data.touch.dy * 2.1),
      });
    }
    else if(data.touch.numberActiveTouches == 0)
    {
      setCursorPosition({
        // 1) nacin za koji treba hardware button
        // x: X0 + Math.round(data.acc.y * 50),
        // y: Y0 + Math.round((data.acc.x - 0.5) * 50),

        // 2) nacin za koji ne treba hardware button
        x: X0 - Math.round((data.gyro.x + data.gyro.z) * 15) * 1.25,
        y: Y0 + Math.round(data.gyro.y * 15) * 1.3,

        // Ustimaj za svoj ekran vrijednosti 50 za 1. nacin i 1.25 za drugi
        // Trenutno su nastimane za 2560x1440 rezoluciju
      });
    }

  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

const click = (x: number, y: number) => {
  sendCursorEvent({ event: cursorEvents.LEFT_DOWN, data: 0, x, y });
  sendCursorEvent({ event: cursorEvents.LEFT_UP, data: 0, x, y });
};
