const {getRoomUser,getCurrentUser, userLeave, userAdd} = require("./users");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors')
const formatMessage = require("./messages");


const app = express();
app.use(cors());

const port =process.env.PORT || 9000;
const server = http.createServer(app);


const io = socketIo(server,{
    cors: {
        origin: '*',
    }
});


io.on("connection",socket=>{
    socket.on("joinRooms",({username,room})=>{

        const users = userAdd(socket.id, username, room);
        socket.join(users.room);
        socket.emit("message",formatMessage("Welcome to Chat"));

        socket.broadcast.to(users.room).emit("message",formatMessage(`${users.username} has join the chat`));

        io.to(users.room).emit("roomUsers",{
            room: users.room,
            users: getRoomUser(users.room)
        })
    });
    //client disconnect
    socket.on("disconnect",()=>{
        const user = userLeave(socket.id);
        if (user){
            io.to(user.room).emit("message",formatMessage(`${user.username} has left the chat`));

            io.to(user.room).emit("roomUsers",{
                room: user.room,
                users: getRoomUser(user.room)
            })

        }
    });

    //Listen for chat message
    socket.on("chatMessage",(msg)=>{
        const user = getCurrentUser(socket.id);
        // io.emit("message", msg);
        io.to(user.room).emit("message",formatMessage(user.username,msg));
    })
});




server.listen(port,()=>console.log(`listening to: ${port}`));







