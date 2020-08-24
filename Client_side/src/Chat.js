import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import quertString from "query-string";
import "./Chat.css";
import onlineIcon2 from "./onlineIcon2.png";
import InfoBar from "./infobar";
import InputBar from "./InputBar";
import Messages from "./Messages";

//Socket var is dclared here!
let socket;

const Chat = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = `localhost:5000`;

  console.log("USERS", users);

  // A useEffect hook for functions such as joinning and disconnetion function, also rerendering it when the ENDPOINT changes or the url query string changes.
  useEffect(() => {
    const { name, room } = quertString.parse(props.location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    //we're getting the room name from the JOIN page and we're sending it to BACKEND for joining that room
    socket.emit("join", { name, room }, (error) => {
      alert(error);
    });

    //this act as a unmount function. When the component is about to unmount
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [props.location.search, ENDPOINT]);

  //this hook is for receiving msges from the server that is sent to the server from the front end!
  useEffect(() => {
    //---------------------------------//
    //Keeping track of all the messages
    socket.on("message", (message) => {
      //Each message var in the array is an object conating a name, this is essential coz when we're alinging the msgs left or right having known that which user sent it will help us in aligning!
      setMessages((messages) => [...messages, message]);
    });
    //---------------------------------//
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    console.log(users);
  }, []);

  // A function that triggers which sends a msg to the BACKEND when the send btn is click in the JSX.
  function sendMessage(event) {
    event.preventDefault();
    console.log(socket);

    //sending a msg to the BACKEND
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  }

  console.log(messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <InputBar
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <div className="data-div">
        <div className="headers">
          <h3>Welcome to the {room}! ⬅️ </h3>
          <div className="div-link">
            <h3>
              FAQs
              <a
                className="learnmore"
                href="https://rexetorizesreactchatapp.netlify.app"
              >
                {" "}
                Click Here
              </a>
            </h3>
          </div>
          <h4>Start typing in the left chat box 😊</h4>
        </div>
        <div className="user-lists">
          <h5 className="list-headeing">Users currently online 🟢</h5>
          <div className="list-items">
            {users.map((user) => {
              return (
                <div className="each-user-in-list">
                  <p className="online-icon">🟢</p>
                  {user.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
