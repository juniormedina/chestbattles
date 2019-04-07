import React, { Component } from "react";
import io from "socket.io-client";
import Lobby from './Lobby';
import Game from '../Game'
const socketURL = "http://localhost:4000";

class Multiplayer extends Component {
  state = {
    socket: null,
    inGame: false
  };

  componentWillMount() {
      this.initSocket();
  }

  render() {
    return (
        <React.Fragment>
            {!this.state.inGame ? <Lobby /> : <Game />}
        </React.Fragment>
    );
  }

  // Initializes a socket for Server Communication
  initSocket = () => {
    const socket = io(socketURL);
    socket.on("connect", () => {
      console.log("[Multiplayer]", "Connected to server..");
    });
    socket.on("lobby", (data) => {
        console.log("Rooms available: " + data.rooms.length);
    })
    this.setState({ socket });
  };
}

export default Multiplayer;
