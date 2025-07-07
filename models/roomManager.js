class RoomManager {
  constructor() {
    this.totalUser = {};
  }

  joinRoom(roomId) {
    if (!this.totalUser[roomId]) {
      this.totalUser[roomId] = 0;
    }
    this.totalUser[roomId]++;
    return this.totalUser[roomId];
  }

  leaveRoom(roomId) {
    if (this.totalUser[roomId]) {
      this.totalUser[roomId]--;
      if (this.totalUser[roomId] <= 0) {
        delete this.totalUser[roomId];
        return 0;
      }
      return this.totalUser[roomId];
    }
    return 0;
  }

  getRoomCount(roomId) {
    return this.totalUser[roomId] || 0;
  }
}

export const roomManager = new RoomManager(); 