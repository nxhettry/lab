import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log(new Date() + "server is listening on port 8080");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(socket) {
  socket.on("error", () => {
    console.log("Error in websocket server ", console.error);
  });

  socket.on("message", function message(data, isBinary) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  socket.send("Welcome to the websocket server");
});
