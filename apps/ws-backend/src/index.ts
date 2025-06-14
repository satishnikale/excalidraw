import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080});


wss.on("", function connection(ws){
    ws.on("message", function message(){
        ws.send("Pong");
    });
});