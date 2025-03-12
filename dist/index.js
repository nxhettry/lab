"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8080, () => {
    console.log(new Date() + "server is listening on port 8080");
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on("connection", function connection(socket) {
    socket.on("error", () => {
        console.log("Error in websocket server ", console.error);
    });
    socket.on("message", function message(data, isBinary) {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    socket.send("Welcome to the websocket server");
});
