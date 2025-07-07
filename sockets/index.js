import { userManager } from '../models/userManager.js';
import { roomManager } from '../models/roomManager.js';
import { logger } from '../utils/logger.js';

export function registerSocketHandlers(IO) {
  IO.on('connection', (socket) => {
    // logger.info('user connected: ', socket.id);

    socket.on('join room', ({ roomId, userName }) => {
      if (!userName || !roomId) {
        socket.emit('error', 'room id and username is required');
        return;
      }
      userManager.addUser(socket.id, userName);
      socket.join(roomId);
      const count = roomManager.joinRoom(roomId);
      socket.emit('joined room');
      socket.to(roomId).emit('total room participant', { onlineRoomUsers: count });
      // logger.info('Username:', userName, 'joined room: ', roomId);
    });

    socket.on('room message', ({ roomId, message }) => {
      if (!socket.rooms.has(roomId)) {
        return socket.emit('error', "Access denied: you're not in this room.");
      }
      // logger.info(`${roomId}: ${userManager.getUser(socket.id)}: ${message}`);
      socket.to(roomId).emit('room message', { userName: userManager.getUser(socket.id), message });
    });

    socket.on('disconnect', ({ roomId }) => {
      const count = roomManager.leaveRoom(roomId);
      socket.to(roomId).emit('total room participant', { onlineRoomUsers: count });
      // logger.info('User disconnected: ', userManager.getUser(socket.id));
      userManager.removeUser(socket.id);
    });
  });
} 