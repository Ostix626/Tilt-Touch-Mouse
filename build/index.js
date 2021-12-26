"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var node_cursor_1 = require("node-cursor");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
var server = (0, http_1.createServer)(app);
var port = 3001;
server.listen(port, function () {
    console.log("Server listening on port: " + port);
});
var X0;
var Y0;
var NUMBER_ACTIVE_TOUCHES = 0;
var io = new socket_io_1.Server(server, {
    cors: { origin: "http://" },
});
io.on("connection", function (socket) {
    console.log("Socket " + socket.id + " connected");
    socket.on("data", function (data) {
        console.log("Received data from " + socket.id + ":");
        console.log(data);
        var _a = (0, node_cursor_1.getCursorPosition)(), x = _a.x, y = _a.y;
        if (data.click) {
            click(x, y);
            return;
        }
        if (NUMBER_ACTIVE_TOUCHES !== data.touch.numberActiveTouches) {
            X0 = x;
            Y0 = y;
            NUMBER_ACTIVE_TOUCHES = data.touch.numberActiveTouches;
        }
        else if (NUMBER_ACTIVE_TOUCHES == 0) {
            X0 = x;
            Y0 = y;
        }
        // if(data.touch.dx != 0 && data.touch.dy != 0 &&
        //  data.touch.numberActiveTouches == 1){
        if (data.touch.numberActiveTouches == 1) {
            (0, node_cursor_1.setCursorPosition)({
                x: X0 + Math.round(data.touch.dx * 2.1),
                y: Y0 + Math.round(data.touch.dy * 2.1),
            });
        }
        else if (data.touch.numberActiveTouches == 0) {
            (0, node_cursor_1.setCursorPosition)({
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
    socket.on("disconnect", function () {
        console.log("Socket " + socket.id + " disconnected");
    });
});
var click = function (x, y) {
    (0, node_cursor_1.sendCursorEvent)({ event: node_cursor_1.cursorEvents.LEFT_DOWN, data: 0, x: x, y: y });
    (0, node_cursor_1.sendCursorEvent)({ event: node_cursor_1.cursorEvents.LEFT_UP, data: 0, x: x, y: y });
};
