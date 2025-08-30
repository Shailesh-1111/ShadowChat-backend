import User from "./user.js";

export class Room {
    constructor(id, name, options={}){
        this.id = id;
        this.name = name;
        this.users  = {};
    }
}


class RoomManager{
    constructor(){
        this.rooms = {};
    }

    getRoom(roomId, options = {}) {
        if (!this.rooms[roomId]) {
            this.rooms[roomId] = new Room(roomId, options);
        }
        return this.rooms[roomId];
    }

    removeRoomIfEmpty(roomId){
        if(this.rooms[roomId]){
            delete this.rooms[roomId];
        }
    }

    removeAllEmptyRooms() {
        for (const [roomId, room] of Object.entries(this.rooms)) {
            if (!room.users || Object.keys(room.users).length === 0) {
                delete this.rooms[roomId];
            }
        }
    }

    getParticipantCount(roomId){
        if(this.rooms[roomId]){
            return this.rooms[roomId].userManager.getUserCount();
        }

        return 0;
    }

    addUser(roomId, userDetails) {
        if (!this.rooms[roomId]) {
            this.rooms[roomId] = { users: [] };
        }
    
        const newUser = new User( userDetails?.socketId,  userDetails?.userName, userDetails?.options);
    
        this.rooms[roomId].users[userDetails?.socketId] = newUser;
    
        return { status: "success", message: "User added", user: newUser };
    }

    removeUser(roomId, socketId) {
        if (!this.rooms[roomId]) {
            return { status: "error", message: "Room doesn't exist" };
        }
    
        if (this.rooms[roomId].users[socketId]) {
            delete this.rooms[roomId].users[socketId];
            return { status: "success", message: "User removed" };
        } else {
            return { status: "error", message: "User not found in room" };
        }
    }

    getUser(roomId, socketId) {
        if (!this.rooms[roomId]) {
            return { status: "error", message: "Room doesn't exist" };
        }
    
        if(this.rooms[roomId].users[socketId]) {
           return this.rooms[roomId].users[socketId];
        } else {
            return { status: "error", message: "User not found in room" };
        }
    }
    

    getAllUsers(roomId){
        if(!this.rooms[roomId]){
            return {status:"error", message:"Room doesn't exist."}
        }

        return this.rooms[roomId];
    }

    getTotalParticipants(roomId){
        if(!this.rooms[roomId]){
            return {status:"error", message:"Room doesn't exist."}
        }

        return Object.keys(this.rooms[roomId].users).length;
    }

    findRoomId(socketId) {
        for (const [roomId, room] of Object.entries(this.rooms)) {
            if (room.users[socketId]) {
                return roomId;
            }
        }
        return null;
    }
}


export const roomManager = new RoomManager();