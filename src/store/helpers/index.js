import { turns, cardLibrary, outcomes } from "../../config";
// Generates initial deck
const generateDeck = size => {
  let deck = [];
  for (let i = 0; i < size; i++) {
    let card = Math.floor(Math.random() * cardLibrary.length);
    deck.push(card);
  }
  return deck;
};
// Attempts to draw cards from deck
const draw = (quantity, deck, hand = []) => {
  let updatedDeck = [...deck];
  let updatedHand = [...hand];
  // Grabs cards from the deck depending on quantity passed
  for (let i = 0; i < quantity; i++) {
    // Checks if deck is empty
    if (updatedDeck.length < 1) break;
    // Generates random index
    let rIndex = Math.floor(Math.random() * updatedDeck.length);
    // Grabs object with index generated from deck
    let card = updatedDeck[rIndex];
    // Stores object/card from deck
    updatedHand = [...updatedHand, card];
    // Removes object/card from deck
    updatedDeck.splice(rIndex, 1);
  }
  return { updatedDeck, updatedHand };
};
// Simulates a dice roll and returns the result
const diceRoll = sides => {
  return Math.floor(Math.random() * sides);
};
// Returns boolean result of comparing two card's type
export const compareCards = (first, second) => {
  return cardLibrary[first].type === cardLibrary[second].type ? true : false;
};

// Returns a counter card if any is eligible
const counter = (playerCard, opponentHand) => {
  // Stores eligible cards for a counter
  let eligibleCards = [];
  // Loops through each card in opponentHand
  for (let i = 0; i < opponentHand.length; i++) {
    let opponentCard = opponentHand[i];
    // Adds card into eligibleCards if the cards type is the same
    if (compareCards(playerCard, opponentCard)) {
      eligibleCards.push(i);
    }
  }
  if (eligibleCards.length > 0) {
    // Returns a card's index from eligibleCards
    // TODO: loop through cards to find the highest power
    return eligibleCards[Math.floor(Math.random() * eligibleCards.length)];
  } else {
    return null;
  }
};
// Calculates and returns total discard amount
const calculateDiscard = (attacker, defender) => {
  if (defender !== null) return cardLibrary[attacker].power - cardLibrary[defender].power;
  else return cardLibrary[attacker].power;
};

// Discards random cards from hand and returns updated hand
const discardRandom = (hand, quantity) => {
  // Checks if hand has enough cards to discard
  if (hand.length > quantity) {
    // Discards the quantity passed
    let updatedOpponentHand = [...hand];
    updatedOpponentHand.splice(0, quantity);
    return updatedOpponentHand;
  } else {
    // Returns an empty array since there wasn't enough cards to discard
    return [];
  }
};

// Discards an array of cards from hand and returns updated hand
const discard = (hand, cards) => {
  let updatedHand = [...hand];
  // Sort cards in descending order
  let sortedCards = [...cards];
  sortedCards.sort((a, b) => b - a);
  for (let i = 0; i < sortedCards.length; i++) {
    updatedHand.splice(sortedCards[i], 1);
  }
  return updatedHand;
};

// Checks if either hands are empty
const check = (playerHand, opponentHand) => {
  if (playerHand.length === 0 && opponentHand.length === 0) {
    // Match is a draw
    return outcomes.DRAW;
  } else if (playerHand.length === 0) {
    // Player has lost
    return outcomes.OPPONENT;
  } else if (opponentHand.length === 0) {
    // Opponent has lost
    return outcomes.PLAYER;
  } else {
    // Match is not over
    return null;
  }
};

// Uses card from hand
const use = (hand, card) => {
  // Grabs card from hand
  let updatedCard = hand[card];
  // Updates hand
  let updatedHand = [...hand];
  updatedHand.splice(card, 1);
  return { updatedHand, updatedCard };
};

// Changes turn
const nextTurn = turn => {
  if (turn === turns.PLAYER) return turns.OPPONENT;
  else return turns.PLAYER;
};

export default {
  generateDeck,
  draw,
  diceRoll,
  counter,
  calculateDiscard,
  discardRandom,
  discard,
  check,
  use,
  nextTurn
};
