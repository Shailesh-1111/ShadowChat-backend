export default class User{
    constructor(socketId, name, options={}){
        this.socketId = socketId;
        this.name = name;
        this.role = options?.role || '';
        this.avatar = options?.avatar || '';
    }
} 
