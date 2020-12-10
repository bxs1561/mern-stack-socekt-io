import './App.css';
import React from "react"
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:9000";
// import openSocket from 'socket.io-client';
// const  socket = openSocket('http://localhost:9000');

function App() {
  const socket = socketClient(SERVER)
  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`);
  });

  return (
      <div className="App">

      </div>
  );
}

export default App;

