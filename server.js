import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { registerSocketHandlers } from './sockets/index.js';
import { logger } from './utils/logger.js';
import { PORT } from './config/index.js';

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Or use your FRONTEND_URL for production
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for API routes if needed
app.use(cors({
    origin: '*', // Or use your FRONTEND_URL for production
    methods: ['GET', 'POST']
}));

// Register all socket event handlers
registerSocketHandlers(io);

// Start the server
server.listen(PORT, () => {
    logger.info('-------------------------');
    logger.info('Listening to Port', PORT);
    logger.info('-------------------------');
});