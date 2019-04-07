import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";

const header = () => (
  <div className="header">
    <div className="logo-icon">
        <Link to="/">
          <img src={require(`../../../assets/images/chest.png`)} alt="chest icon" />
        </Link>
    </div>
    <div className="logo-text">
        <Link to="/">Chest Battles</Link>
    </div>

    <ul className="links show-on-med-up">
      <li>
        <Link to="/howtoplay">How To Play</Link>
      </li>
      <li>
        <Link to="/updates">Updates</Link>
      </li>
    </ul>
    <p className="menu hide-on-med-up">[=]</p>
  </div>
);

export default header;
