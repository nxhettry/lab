"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(function (req, res) {
    console.log(new Date() + ` Receievd request for ${req.url}`);
    res.end("Hi there");
});
const wss = new ws_1.WebSocketServer({ server });
let userCount = 0;
wss.on("connection", function connection(socket) {
    ++userCount;
    console.log("New WebSocket connection established, Total connections: " + userCount);
    socket.on("error", (err) => {
        console.log("WebSocket error: ", err);
    });
    socket.on("message", function message(data, isBinary) {
        console.log("Received message:", data);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, {
                    binary: isBinary,
                });
            }
        });
    });
    socket.send("Hello ! you have connected to the websocket server");
});
server.listen(8080, () => {
    console.log(new Date() + " server is listening on port 8080");
});
