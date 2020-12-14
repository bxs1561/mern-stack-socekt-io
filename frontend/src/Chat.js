import React, {useEffect, useState} from "react";
import "./Chat.css"
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:9000";
const socket = socketClient(SERVER)



function Chat(props) {
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState("")
    const [user, setUser] = useState([])
    const [rooms, setRoom] = useState([])

    useEffect(()=>{
        // users.map(usr=>{
        //Send the username and room name to server
            socket.emit("joinRooms",{
                username: props.match.params.roomID,
                room: props.match.params.name
            // })
        })
        //listen back from server and add user and assign room to list
        socket.on('roomUsers', ({ room, users }) => {
             userReceive(room,users)
        });
    },[])

    //keep old and add new user to the list
    function userReceive(room,users){
        setRoom(room)
            setUser([...user,users])
    }

    //listen for incoming message from server
    useEffect(()=>{
    socket.on("message", (message)=>{
        messageReceive(message)
    })
    },[])

    //add message to list
    function messageReceive(message) {
        setMessages(old=>[...old,message])
    }

    //send message back to server, when user click send button
    function SendMessage(e) {
        e.preventDefault()
        socket.emit("chatMessage",message)
        setMessage("")
    }

    return(
            <div className="chat_container">
                <div className="chat_header">
                    <h1> Chat</h1>
                    <a href="/" className="btn">Leave Room</a>
                </div>
                <div className="chat_main">
                    <div className="chat_sidebar">
                        <h3><i className="fas fa-comments"></i> Room Name:</h3>
                        <h2 id="room-name">
                        {rooms}
                        </h2>
                        <h3><i className="fas fa-users"></i> Users</h3>
                        {user.map(usr=>(
                            usr.map(users=>(
                                <ul id="users" key={user.username}>
                                    <li> {users.username}</li>
                                </ul>
                            ))
                        ))}

                    </div>
                    <div className="chat_messages" >
                        {messages.map((m, index)=>(
                            <div className="message">
                            <p className="meta" key={m.id}>
                               {m.username}
                                {`   `}
                                <span>{m.time}</span>
                                <p>{ m.text}</p>
                            </p>
                            </div>
                        ))}

                    </div>



                </div>

                <div className="chat_form">
                    <form>
                        <input
                            type="text"
                            placeholder="Enter Message"
                            autoComplete="off"
                            value={message}
                            onChange={event => setMessage(event.target.value)}
                        />
                        <button onClick={SendMessage} type="submit" className="btn"><i className="fas fa-paper-plane"></i> Send</button>
                    </form>
                </div>
        </div>
)

}
export default Chat
