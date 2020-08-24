import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";
const Message = ({ message: { text, user }, name }) => {
  let isCurrentUser = false;

  let tempname = name.trim().toLowerCase();

  if (tempname === user) {
    isCurrentUser = true;
  }

  // Here were dealing with the ui, setting a sender's name behind the msg and aligning it left or right
  return isCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{tempname}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
