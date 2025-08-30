import { chatService } from '../services/chatService.js';
import { logger } from '../utils/logger.js';

export function registerSocketHandlers(io) {
    io.on('connection', (socket) => {
        // logger.info('User connected:', socket.id);

        // Join Room
        socket.on('join room', ({ roomId, userName }) => {
            const result = chatService.joinRoom(socket.id, roomId, userName);
            if (result.status === "success") {
                socket.join(roomId);
                io.in(roomId).emit('joined room', result);
            } else {
                socket.emit('error', result);
            }
        });


        // Send Message
        socket.on('room message', ({ roomId, message }) => {
            const result = chatService.validateMessage(socket.id, roomId, message);
            if (result.status === "success") {
                socket.to(roomId).emit('room message', result.data);
                socket.emit('message sent', { status: "success" });
            } else {
                socket.emit('error', result);
            }
        });

        // Get Room Participant Count
        socket.on('get room participant', ({ roomId }) => {
            const result = chatService.getRoomParticipant(roomId);
            if (result.status === "success") {
                socket.emit('room participant count', { roomId, count: result.count });
            } else {
                socket.emit('error', result);
            }
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            // logger.info('User disconnected:', socket.id);
            const roomId = chatService.findRoomId(socket.id);
            
            const result = chatService.leaveRoom(roomId, socket.id);
            if (result.status === "success") {
                socket.leave(roomId);
                io.in(roomId).emit('left room', result);
            } else {
                socket.emit('error', result);
            }
        });
    });
}