import React, { Component } from "react";
import { connect } from "react-redux";
import Game from "../../components/Game";
import * as actions from "../../store/actions";
import { phases, turns, modes } from "../../config";

const mode = modes.SINGLE_PLAYER;
class SinglePlayer extends Component {
  componentDidMount() {
    // Starts the Game
    this.props.onStart(mode);
  }

  render() {
    this.gameController();
    return this.loadGame();
  }

  // Helpers

  // Hands all phase actions to action creators
  phaseHandler = (data = null) => {
    this.props.onPhase(mode, this.props.phase, data);
  };

  loadGame = () => {
    if (this.props.isGameStarted) {
      // Displays Game
      return <Game {...this.props} phaseHandler={this.phaseHandler} />;
    } else {
      // Displays Loading Screen
      return <p>Loading game...</p>;
    }
  };

  gameController = () => {
    //SP Phase Transitions --------------------------------
    if (this.props.turn === turns.PLAYER) {
      switch (this.props.phase) {
        case phases.DRAW:
          this.transition("Player draws a card..");
          break;
        case phases.BATTLE:
          console.log("Player has to play a card..");
          break;
        case phases.COUNTER:
          this.transition("Opponent attempts to counter..");
          break;
        case phases.CALCULATE:
          this.transition("Calculating battle result..");
          break;
        case phases.DISCARD:
          this.transition(
            `Opponent has discarded ${this.props.discard} cards!`
          );
          break;
        case phases.END:
          this.transition("End of Player turn..");
          break;
        default:
      }
    } else {
      switch (this.props.phase) {
        case phases.DRAW:
          this.transition("Opponent draws a card..");
          break;
        case phases.BATTLE:
          this.transition("Opponent plays a card..");
          break;
        case phases.COUNTER:
          console.log("Player attempts to counter..");
          break;
        case phases.CALCULATE:
          this.transition("Calculating battle result..");
          break;
        case phases.DISCARD:
          console.log(`Player has to discard ${this.props.discard} cards`);
          break;
        case phases.END:
          this.transition("End of Opponent turn..");
          break;
        default:
      }
    }
  };

  transition = (message, ms = 3000) => {
    setTimeout(() => {
      console.log(message);
      this.phaseHandler();
    }, ms);
  };
}

const mapStateToProps = state => ({
  deck: state.deck.length,
  playerHand: state.playerHand,
  opponentHand: state.opponentHand.length,
  playerCard: state.playerCard,
  opponentCard: state.opponentCard,
  discard: state.discard,
  turn: state.turn,
  phase: state.phase,
  isGameStarted: state.isGameStarted,
  outcome: state.outcome
});

const mapDispatchToProps = dispatch => ({
  onStart: mode => dispatch(actions.start(mode)),
  onPhase: (mode, phase, data) => dispatch(actions.update(mode, phase, data)),
  onSet: (data) => dispatch(actions.set(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePlayer);
