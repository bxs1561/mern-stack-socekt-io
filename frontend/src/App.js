import './App.css';
import React, {useRef} from "react"
import socketClient from "socket.io-client";
import Chat from "./Chat";
import HomePage from "./HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";


function App() {

    return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/room/user=:roomID&room=:name" component={Chat} />
                  {/*<Route path="/chat" >*/}
                  {/*    <Chat/>*/}
                  {/*</Route>*/}
                  {/*<Route path="/">*/}
                  {/*    <HomePage/>*/}
                  {/*</Route>*/}

              </Switch>
          </BrowserRouter>
        {/*<Chat/>*/}
        {/*<HomePage/>*/}
      </div>
  );
}

export default App;

