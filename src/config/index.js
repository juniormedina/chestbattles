// Game Modes
const modes = {
  SINGLE_PLAYER: 0,
  MULTIPLAYER: 1
}

// Phases 
const phases = {
  DRAW: 0,
  STANDBY: 1, // For future use
  BATTLE: 2,
  COUNTER: 3,
  CALCULATE: 4,
  DISCARD: 5,
  END: 6,
  GAMEOVER: 7
};

// Turns
const turns = {
  PLAYER: 0,
  OPPONENT: 1
}

// Outcomes
const outcomes = {
  PLAYER: 0,
  OPPONENT: 1,
  DRAW: 2,
}

// Types 
const types = {
  MELEE: 0,
  MAGIC: 1
};

// Helpers
const cardCreator = (name, type, power) => {
  return { name, type, power };
};

// Cards
const cardLibrary = [
  // (Melee)-------------
  cardCreator('Iron Dagger', types.MELEE, 1),
  cardCreator('Wooden Sword', types.MELEE, 1),
  cardCreator('Iron Sword', types.MELEE, 2),
  cardCreator('Iron Axe', types.MELEE, 2),
  cardCreator('Iron Battle-Axe', types.MELEE, 3),
  cardCreator('Iron Hammer', types.MELEE, 4),

  // (Magic)-------------
  cardCreator('Wand', types.MAGIC, 1),
  cardCreator('Air Tome', types.MAGIC, 1),
  cardCreator('Water Tome', types.MAGIC, 2),
  cardCreator('Frost Tome', types.MAGIC, 2),
  cardCreator('Lightning Tome', types.MAGIC, 3),
  cardCreator('Fire Tome', types.MAGIC, 4),
];


module.exports = {
  modes,
  phases,
  turns,
  outcomes,
  types,
  cardLibrary
};
