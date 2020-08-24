import React from "react";
import "./infobar.css";
import onlineIcon2 from "./react-assets/onlineIcon2.png";
import closeIcon from "./react-assets/closeIcon.png";

const InfoBar = ({ room }) => {
  return (
    <div className="info-component">
      <div className="info-bar">
        <div className="left-box">
          <img className="Online-icon" src={onlineIcon2} />
          <h3 className="left-box-title">{room}</h3>
        </div>
        <div className="right-box">
          <a href="/">
            <img className="icon-close" src={closeIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
