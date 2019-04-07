import { modes, phases } from "../config";
// import axios from "axios";
import actionTypes from "./actionTypes";

export const start = mode => {
  switch (mode) {
    case modes.SINGLE_PLAYER:
      return actionCreator(actionTypes.SP_START);
    case modes.MULTIPLAYER:
      // Implementing after single player is fully functional
      // Runs async code using redux thunk
      return actionCreator(actionTypes.MP_USE);
    default:
      return actionCreator();
  }
};

export const update = (mode, phase, data = null) => {
  switch (mode) {
    case modes.SINGLE_PLAYER:
      switch (phase) {
        case phases.DRAW:
          return actionCreator(actionTypes.SP_DRAW);
        case phases.STANDBY:
          return actionCreator(actionTypes.SP_STANDBY);
        case phases.BATTLE:
          return actionCreator(actionTypes.SP_BATTLE, { card: data });
        case phases.COUNTER:
          return actionCreator(actionTypes.SP_COUNTER, { card: data });
        case phases.CALCULATE:
          return actionCreator(actionTypes.SP_CALCULATE);
        case phases.DISCARD:
          return actionCreator(actionTypes.SP_DISCARD, { cards: data });
        case phases.END:
          return actionCreator(actionTypes.SP_END);
        default:
          return actionCreator();
      }
    case modes.MULTIPLAYER:
      // Implementing after single player is fully functional
      // Runs async code using redux thunk
      return actionCreator(actionTypes.MP_USE);
    default:
      return actionCreator();
  }
};

export const set = data => {
  return actionCreator(actionTypes.SP_SET, { data });
}


// Helpers
const actionCreator = (type = null, payload = null) => {
  return { type, payload };
};

// export const spStartRequest = () => {
//   return dispatch => {
//     console.log("[spStartRequest]", "Sending request...");
//     axios.get(`${baseURL}/sp/start`).then(res => {
//       console.log("[spStartRequest]", "Received Response!");
//       console.log(res.data);
//       dispatch(spStartResponse(res.data));
//     });
//   };
// };

// export const spUseRequest = card => {
//   return (dispatch, getState) => {
//     // TODO: send request to server with card selection; Server then returns success and opponents selection, with an updated oponnet cards
//     let { token } = getState();
//     console.log("[spUseRequest]", `Token: ${token} | Card: ${card}`);
//     axios
//       .post(`${baseURL}/sp/use`, {
//         token,
//         card
//       })
//       .then(res => {
//         console.log("[spUseRequest]", "Received Response!");
//         console.log(res.data);
//         dispatch(spUseResponse(res.data));
//       });
//   };
// };

// const spUseResponse = data => {
//   return {
//     type: action.SP_USE,
//     payload: { ...data }
//   };
// };

// export const spCounterRequest = card => {
//   return (dispatch, getState) => {
//     // TODO: send request to server with card selection; Server then returns success and opponents selection, with an updated oponnet cards
//     let { token } = getState();
//     console.log("[spCounterRequest]", `Token: ${token} | Card: ${card}`);
//     axios
//       .post(`${baseURL}/sp/counter`, {
//         token,
//         card
//       })
//       .then(res => {
//         console.log("[spCounterRequest]", "Received Response!");
//         console.log(res.data);
//         dispatch(spCounterResponse(res.data));
//       });
//   };
// };

// const spCounterResponse = data => {
//   return {
//     type: action.SP_COUNTER,
//     payload: { ...data }
//   };
// };

// export const spDiscardRequest = cards => {
//   return (dispatch, getState) => {
//     let { token } = getState();
//     console.log("[spDiscardRequest]", `Token: ${token} | Cards: ${cards}`);
//     axios
//       .post(`${baseURL}/sp/discard`, {
//         token,
//         cards
//       })
//       .then(res => {
//         console.log("[spDiscardRequest]", "Received Response!");
//         console.log(res.data);
//         dispatch(spDiscardResponse(res.data));
//       });
//   };
// };

// const spDiscardResponse = data => {
//   return {
//     type: action.SP_DISCARD,
//     payload: { ...data }
//   };
// };
