import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';
import { PORT, FRONTEND_URL } from './config.js';
import { registerSocketHandlers } from './sockets/index.js';

const app = express();
const server = http.createServer(app);
const IO = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST"]
}));

registerSocketHandlers(IO);

server.listen(PORT, () => {
  console.log("-------------------------");
  console.log("Listening to Port", PORT);
  console.log("-------------------------");
});