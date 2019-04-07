import React, { Component } from "react";
import OpponentHand from "../OpponentHand";
import Hand from "../Hand";
import Field from "../Field";
import { phases, turns, outcomes } from "../../config";
import { compareCards } from "../../store/helpers";
import { Grid, Background, Message } from "../Styled";

class Game extends Component {
  state = {
    discardCards: []
  };

  render() {
    let { message, button, onEvent } = this.updateHandler();
    return (
      <React.Fragment>
        <Background />
        <Message id="message">
          <span>{message}</span>
        </Message>
        <Grid
          height="100%"
          gridTemplateRows="repeat(3, 1fr)"
          gridTemplateColumns="1fr"
        >
          <OpponentHand hand={this.props.opponentHand} />
          <Field {...this.props} />
          <Hand
            hand={this.props.playerHand}
            onEvent={onEvent}
            message={message}
            button={button}
            discardCards={this.state.discardCards}
          />
        </Grid>
      </React.Fragment>
    );
  }

  updateHandler = () => {
    // Assigns message and onEvent depending on the current turn and phase
    let message = null;
    let button = null;
    let onEvent = () => null;
    if (this.props.turn === turns.PLAYER) {
      switch (this.props.phase) {
        case phases.DRAW:
          message = <p>Drawing card</p>;
          break;
        case phases.BATTLE:
          onEvent = card => this.props.phaseHandler(card);
          message = <p>Select a card for battle</p>;
          break;
        case phases.COUNTER:
          message = <p>Opponent attempts to counter</p>;
          break;
        case phases.CALCULATE:
          message = <p>Calculating damage</p>;
          break;
        case phases.DISCARD:
          message = <p>Opponent has to discard {this.props.discard} card(s)</p>;
          break;
        case phases.END:
          message = <p>End of your turn!</p>;
          break;
        case phases.GAMEOVER:
          message = this.gameResult();
          break;
        default:
          message = <p>An error has occurred.</p>;
          this.onEvent = null;
      }
    } else {
      switch (this.props.phase) {
        case phases.DRAW:
          message = <p>Opponent draws a card</p>;
          break;
        case phases.BATTLE:
          message = <p>Opponent engaging battle</p>;
          break;
        case phases.COUNTER:
          onEvent = this.counterHandler;
          message = <p>Select a card for counter or press skip</p>;
          button = {onClick: () => this.props.phaseHandler(), text: "Skip"};
          break;
        case phases.CALCULATE:
          message = <p>Calculating damage</p>;
          break;
        case phases.DISCARD:
          // Checks if discard amount is > than cards in hand
          // If so, automatically adds all cards to [] and sends discard action
          if (this.props.playerHand.length <= this.props.discard) {
            this.autoDiscard();
          }
          onEvent = this.discardHandler;
          message = (
            <p>
              {this.props.discard === this.state.discardCards.length
                ? "Press discard"
                : `Select ${this.props.discard - this.state.discardCards.length}
                ${this.state.discardCards.length > 0 ? "more" : ""} 
                ${
                  this.props.discard - this.state.discardCards.length > 1
                    ? "cards"
                    : "card"
                } to discard`}
            </p>
          );
          button = {onClick: this.discardButtonHandler, text: "Discard"};
          break;
        case phases.END:
          message = <p>End of Opponent's turn!</p>;
          break;
        case phases.GAMEOVER:
          message = this.gameResult();
          break;
        default:
          message = <p>An error has occurred.</p>;
      }
    }
    return { message, button, onEvent };
  };

  discardHandler = card => {
    // Checks if card already was selected
    let cardFound = this.state.discardCards.indexOf(card);
    if (cardFound !== -1) {
      // Card was found; Remove it
      let updatedDiscardCards = [...this.state.discardCards];
      updatedDiscardCards.splice(cardFound, 1);
      this.setState({ discardCards: updatedDiscardCards });
    } else if (this.state.discardCards.length >= this.props.discard) {
      // discardCards is full; Disregard request
      return;
    } else {
      let updatedDiscardCards = [...this.state.discardCards];
      updatedDiscardCards.push(card);
      this.setState({ discardCards: updatedDiscardCards });
    }
  };

  discardButtonHandler = () => {
    if (this.state.discardCards.length === this.props.discard) {
      this.props.phaseHandler(this.state.discardCards);
      this.setState({ discardCards: [] });
    }
  };

  counterHandler = card => {
    // Checks if card is an eligible
    if (compareCards(this.props.playerHand[card], this.props.opponentCard)) {
      this.props.phaseHandler(card);
    } else {
      return;
    }
  };

  gameResult = () => {
    let result;
    switch (this.props.outcome) {
      case outcomes.DRAW:
        result = "Draw";
        break;
      case outcomes.PLAYER:
        result = "You won!";
        break;
      case outcomes.OPPONENT:
        result = "You lose..";
        break;
      default:
        result = "Error";
    }
    return <p>Game Over. {result}</p>;
  };

  autoDiscard = () => {
    let discardCards = [];
    console.log(
      "[LOOK HERE]",
      "playerHand length: " + this.props.playerHand.length
    );
    for (let i = 0; i < this.props.playerHand.length; i++) {
      console.log("[LOOK HERE]", "grabbed index: " + i);
      discardCards.push(i);
    }
    console.log("[LOOK HERE]", "Sending array: " + discardCards);
    this.props.phaseHandler(discardCards);
  };
}

export default Game;
