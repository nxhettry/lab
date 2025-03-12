import { WebSocketServer } from "ws";
import express from "express";
import http from "http";

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Hello ! this is a message from server");
});

httpServer.listen(8000, () => {
  console.log(new Date() + ` Server is listening on port 8000`);
});
