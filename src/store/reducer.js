import { phases, turns } from "../config";
import actionTypes from "./actionTypes";
import helpers from "./helpers";

const initialState = {
  deck: [],
  playerHand: [],
  opponentHand: [],
  playerCard: null,
  opponentCard: null,
  discard: 0,
  phase: null,
  turn: null,
  isGameStarted: false
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case actionTypes.SP_SET:
      return (() => ({ ...state, ...payload.data }))();
    case actionTypes.SP_START:
      return (() => {
        let update = {};
        // Generates Card Deck
        let deck = helpers.generateDeck(40);
        // Player Draws Starting Cards
        let playerDraw = helpers.draw(6, deck);
        let playerHand = playerDraw.updatedHand;
        // Opponent Draws Starting Cards
        let opponentDraw = helpers.draw(6, playerDraw.updatedDeck);
        let opponentHand = opponentDraw.updatedHand;
        // Updates Deck
        let updatedDeck = opponentDraw.updatedDeck;
        // Decides which player goes first
        let turn = 0; //helpers.diceRoll(2);
        // Returns action to dispatcher
        update = {
          deck: updatedDeck,
          playerHand,
          opponentHand,
          turn,
          phase: phases.DRAW,
          isGameStarted: true
        };
        return { ...state, ...update };
      })();

    case actionTypes.SP_DRAW:
      return (() => {
        let update = {};
        let draw;
        if (state.turn === turns.PLAYER) {
          // Draws 1 card into playerHand
          draw = helpers.draw(1, state.deck, state.playerHand);
          update = { playerHand: draw.updatedHand };
        } else {
          // Draws 1 card into opponentHand
          draw = helpers.draw(1, state.deck, state.opponentHand);
          update = { opponentHand: draw.updatedHand };
        }
        return {
          ...state,
          ...update,
          deck: draw.updatedDeck,
          phase: phases.BATTLE
        };
      })();

    case actionTypes.SP_BATTLE:
      return (() => {
        let update = {};
        if (state.turn === turns.PLAYER) {
          // Grabs card index chosen by player
          let card = payload.card;
          // Updates playerHand and playerCard
          let use = helpers.use(state.playerHand, card);
          // Adds to update
          update = {
            playerHand: use.updatedHand,
            playerCard: use.updatedCard
          };
        } else {
          // NOTE: Eventually adding more logic here for smarter plays
          // Picks a card index from opponentHand
          let card = helpers.diceRoll(state.opponentHand.length);
          // Updates opponentHand and opponentCard
          let use = helpers.use(state.opponentHand, card);
          // Adds to update
          update = {
            opponentHand: use.updatedHand,
            opponentCard: use.updatedCard
          };
        }
        return { ...state, ...update, phase: phases.COUNTER };
      })();

    case actionTypes.SP_COUNTER:
      return (() => {
        let update = {};
        if (state.turn === turns.PLAYER) {
          // Attempts to find an eligible counter card in opponentHand
          let card = helpers.counter(state.playerCard, state.opponentHand);
          // Updates if a counter card was found
          if (card !== null) {
            // Updates opponentHand and opponentCard
            let use = helpers.use(state.opponentHand, card);
            // Adds to update
            update = {
              opponentHand: use.updatedHand,
              opponentCard: use.updatedCard
            };
          }
        } else {
          // Decide what to do if player picked a card or skipped phase
          let card = payload.card;
          if (card !== null) {
            let use = helpers.use(state.playerHand, card);
            update = {
              playerHand: use.updatedHand,
              playerCard: use.updatedCard
            };
          }
        }
        return { ...state, ...update, phase: phases.CALCULATE };
      })();

    case actionTypes.SP_CALCULATE:
      return (() => {
        let update = {};
        let discard;
        if (state.turn === turns.PLAYER) {
          // Calculates the discard amount for opponent
          discard = helpers.calculateDiscard(
            state.playerCard,
            state.opponentCard
          );
        } else {
          // Calculates the discard amount for player
          discard = helpers.calculateDiscard(
            state.opponentCard,
            state.playerCard
          );
        }
        // Decides the next phase to be set
        if (discard > 0) {
          update = { discard, phase: phases.DISCARD };
        } else {
          update = { phase: phases.END };
        }
        return { ...state, ...update };
      })();

    case actionTypes.SP_DISCARD:
      return (() => {
        let update = {};
        if (state.turn === turns.PLAYER) {
          // Discards cards from opponentHand
          let updatedOpponentHand = helpers.discardRandom(
            state.opponentHand,
            state.discard
          );
          update = { opponentHand: updatedOpponentHand };
        } else {
          // Discards cards from playerHand
          let cards = [...payload.cards];
          let updatedPlayerHand = helpers.discard(state.playerHand, cards);
          update = { playerHand: updatedPlayerHand };
        }
        return { ...state, ...update, phase: phases.END };
      })();

    case actionTypes.SP_END:
      return (() => {
        let update = {};
        // Checks game's outcome
        let updatedOutcome = helpers.check(
          state.playerHand,
          state.opponentHand
        );
        if (updatedOutcome !== null) {
          // Game Over; Adds outcome to update
          update = { outcome: updatedOutcome, phase: phases.GAMEOVER };
        } else {
          // Adds to update; Clears field
          update = {
            discard: 0,
            playerCard: null,
            opponentCard: null,
            phase: phases.DRAW
          };
        }
        return {
          ...state,
          ...update,
          turn: helpers.nextTurn(state.turn)
        };
      })();
    default:
      return state;
  }
};

export default reducer;
