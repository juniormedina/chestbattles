import { phases } from "../config/rules";
import action from "./action";

const initialState = {
  token: null,
  playerHand: [],
  opponentHand: 0,
  playerCard: null,
  opponentCard: null,
  opponentCounterCard: null,
  phase: null,
  isGameStarted: false,
  isGameOver: false,
  isFetching: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case action.SP_START:
      return {
        ...state,
        ...payload,
        phase: phases.PLAYER_USE,
        isGameStarted: true,
        isFetching: false
      };
    case action.SP_USE:
      return {
        ...state,
        ...payload,
        phase: phases.PLAYER_COUNTER,
        isFetching: false
      };  

    case action.SP_COUNTER:
      return {
        ...state,
        ...payload,
        isFetching: false
      };

      case action.SP_DISCARD:
      return {
        ...state,
        ...payload,
        isFetching: false
      };
      
    default:
      return state;
  }
};

export default reducer;
