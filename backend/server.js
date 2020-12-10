const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors')


const app = express();
app.use(cors());

const port =process.env.PORT || 9000;
const server = http.createServer(app);

const io = socketIo(server,{
    cors: {
        origin: '*',
    }
});
io.on("connection",(socket)=>{
    console.log('new client connected');
    // With the  socket.emit  function,
    // custom events can be sent from the back end to the front end through the newly established socket connection.
    socket.emit('connection', null);

})


server.listen(port,()=>console.log(`listening to: ${port}`));






