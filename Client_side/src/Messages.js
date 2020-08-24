import React from "react";
import "./Messages.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Messages = ({ messages, name }) => {
  /* Messeges is an array, so we're sending each message( message is an object conating a TEXT from the user and the NAME of the user who sent it) */
  return (
    <ScrollToBottom className="scroller">
      {messages.map((message, i) => (
        <div id={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
