import { roomManager } from "../models/room.js";
import { logger } from "../utils/logger.js";


class ChatService{

    joinRoom(socketId, roomId, userName){
        try{
            if(!socketId || !roomId || !userName){
                return {
                    status: "error",
                    error: "socketId, roomId, and userName are required"
                }
            }

            roomManager.addUser(roomId, {socketId:socketId,  userName: userName});
            const online = roomManager.getTotalParticipants(roomId);
            roomManager.removeAllEmptyRooms();
            return {
                status:"success",
                message: `${userName} joined room ${roomId}`,
                data: {
                    onlineUsers: online ?? 100
                }
            };

        }catch(error){
            // logger.error('Error joining room:', error.message);
            return {
                status: "error",
                error: 'Internal server error',
            };
        }
    }

    getRoomParticipant(roomId){
        try{
            const room = roomManager.getRoom(roomId);
            return room.getParticipantCount();
        }catch(error){
            // logger.error('Error getting room participant:', error.message);
            return {
                status: "error",
                error: 'Internal server error',
            };
        }
    }

    leaveRoom(roomId, socketId){
        try{
            const room = roomManager.getRoom(roomId);
            if (!room) {
                return {status: "error", error: "Room not found"};
            }
            roomManager.removeUser(roomId, socketId);
            const online = roomManager.getTotalParticipants(roomId);
            return { 
                status: "success", message: `User left room ${roomId}` ,
                data: {
                    onlineUsers: online ?? 100
                }
            };
        }catch(error){
            // logger.error('Error leaving room:', error.message);
            return {
                status: "error",
                error: 'Internal server error',
            };
        }
    }

    validateMessage(socketId, roomId, message) {
        try {
            if (!socketId || !roomId || !message) {
                return {
                    status: "error",
                    error: "socketId, roomId, and message are required fields."
                };
            }

            if (message.length > 500) {
                return {
                    status: "error",
                    error: "Message surpassed length limit."
                };
            }

            const room = roomManager.getRoom(roomId);
            if (!room) { return { status: "error", error: "Room not found"}; }

            const user = roomManager.getUser(roomId, socketId);
            if (!user) {
                return {
                    status: "error",
                    error: "User not found in this room"
                };
            }

            return {
                status: "success",
                message: "Message sent successfully",
                data: {
                    userName: user.name,
                    message,
                    roomId
                }
            };
        } catch (error) {
            // logger.error('Error sending message:', error.message);
            return {
                status: "error",
                error: 'Internal server error',
            };
        }
    }

    findRoomId(socketId) {
        for (const [roomId, room] of Object.entries(roomManager.rooms)) {
            if (room.users[socketId]) {
                return roomId;
            }
        }
        return null;
    }

}

const chatService = new ChatService();

export {chatService};