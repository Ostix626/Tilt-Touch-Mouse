"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var server = (0, http_1.createServer)(app);
var port = 3001;
server.listen(port, function () {
    console.log("Server listening on port: " + port);
});
var io = new socket_io_1.Server(server, {
    cors: { origin: "http://" },
});
io.on("connection", function (socket) {
    console.log("Socket " + socket.id + " connected");
    socket.on("test", function (data) {
        console.log("Received data from " + socket.id + ":\n" + data);
    });
    socket.on("disconnect", function () {
        console.log("Socket " + socket.id + " disconnected");
    });
});
