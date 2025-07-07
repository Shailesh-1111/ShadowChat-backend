class UserManager {
  constructor() {
    this.users = {};
  }

  addUser(socketId, userName) {
    this.users[socketId] = userName;
  }

  removeUser(socketId) {
    delete this.users[socketId];
  }

  getUser(socketId) {
    return this.users[socketId];
  }
}

export const userManager = new UserManager(); 