import ws from "ws";
import { v4 as uuid } from "uuid";

const { Server } = ws;

const wss = new Server({ port: 5008 });

const clients: { [key: string]: ws } = {};
const messages: Record<string, string>[] = [];

export const startWss = () => {
  wss.on("connection", (ws) => {
    const id = uuid();

    clients[id] = ws;

    console.log(`New client connected: ${id}`);

    ws.on("open", () => {
      console.log("Connection opened");
    });

    ws.on("message", (data) => {
      console.log(`Message: ${data.toString()}`);

      const { message } = JSON.parse(data.toString());

      if (message) {
        messages.push({ id, message });

        clients[id].send("ok");
      }
    });

    clients[id].send(JSON.stringify({ message: "Hello" }));

    ws.on("close", () => {
      delete clients[id];
      console.log(`Client disconnected: ${id}`);
    });
  });
};

process.on("SIGINT", () => {
  console.log("Closing server...");
  wss.close();
  process.exit();
});
