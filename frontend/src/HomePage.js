import React, {useState} from "react";
import "./HomePage.css";


function HomePage(props) {
    const[username, setUsername] = useState('');
    const [groupName, setGroupName] = useState('')


    function EnterRoom(e) {
        e.preventDefault()
        props.history.push(`room/user=${username}&room=${groupName}`)
    }
    return(
        <div className="home">

            <div className="home_container">
                <div className="home_header">
                    <h1>Chat</h1>
                </div>

                <form>
                    <h5>Username</h5>
                    <input type="text" placeholder="enter your name" value={username} onChange={event => setUsername(event.target.value)}/>
                    <h5>Group Name</h5>
                    <input type="text" placeholder="enter your group name" value={groupName} onChange={event => setGroupName(event.target.value)}/>
                    <button onClick={EnterRoom} type="submit">Join</button>
                </form>

            </div>
        </div>
    )

}
export default HomePage
