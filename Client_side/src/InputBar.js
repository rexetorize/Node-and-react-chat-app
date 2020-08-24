import React from "react";
import "./InputBar.css";
import onlineIcon2 from "./react-assets/onlineIcon2.png";
import closeIcon from "./react-assets/closeIcon.png";

const InputBar = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button
        className="sendButton"
        onClick={(event) => {
          sendMessage(event);
        }}
      >
        Send
      </button>
    </div>
  );
};

export default InputBar;
