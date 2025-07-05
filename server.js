const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const path = require('path')
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const IO = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST"]
}));

const users = {};

IO.on('connection',(socket)=>{

    // console.log("user connected: ", socket.id);


    socket.on('join room',({roomId, userName})=>{

        if(!userName || !roomId){
            socket.emit('error', "room id and username is required");
        }
        users[socket.id] = userName;
        socket.join(roomId);
        socket.emit('joined room');
        // console.log('Username:', userName, 'joined room: ',roomId);
    });

    socket.on('room message',({roomId, message})=>{
        if(!socket.rooms.has(roomId)){
            return socket.emit("error", "Access denied: you're not in this room.");
        }

        // console.log(`${roomId}: ${users[socket.id]}: ${message}`);
        socket.to(roomId).emit('room message', {userName: users[socket.id], message: message});
    });

    socket.on('disconnect',()=>{
        // console.log('User disconnected: ', users[socket.io]);
    });
});



const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log("-------------------------")
    console.log("Listening to Port", PORT);
    console.log("-------------------------")
});