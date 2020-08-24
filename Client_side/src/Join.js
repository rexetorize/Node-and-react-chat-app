import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
const Join = () => {
  const [name, SetName] = useState("");
  const [room, SetRoom] = useState("");
  return (
    <div className="Join-page">
      <div className="box-1">
        <div className="uname-box">
          <label>Username </label>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              SetName(e.target.value);
            }}
          />
        </div>
        <br></br>
        <div className="rname-box">
          <label>Room </label>
          <input
            type="text"
            placeholder="room-name"
            onChange={(e) => {
              SetRoom(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className="btn" type="submit">
              Start Chatting!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
