import { baseURL } from "../config";
import axios from "axios";
import action from "./action";

const spStartResponse = data => {
  return {
    type: action.SP_START,
    payload: data
  };
};

export const spStartRequest = () => {
  return dispatch => {
    console.log("[spStartRequest]", "Sending request...");
    axios.get(`${baseURL}/sp/start`).then(res => {
      console.log("[spStartRequest]", "Received Response!");
      console.log(res.data);
      dispatch(spStartResponse(res.data));
    });
  };
};

export const spUseRequest = card => {
  return (dispatch, getState) => {
    // TODO: send request to server with card selection; Server then returns success and opponents selection, with an updated oponnet cards
    let { token } = getState();
    console.log("[spUseRequest]", `Token: ${token} | Card: ${card}`);
    axios
      .post(`${baseURL}/sp/use`, {
        token,
        card
      })
      .then(res => {
        console.log("[spUseRequest]", "Received Response!");
        console.log(res.data);
        dispatch(spUseResponse(res.data));
      });
  };
};

const spUseResponse = data => {
  return {
    type: action.SP_USE,
    payload: { ...data }
  };
};

export const spCounterRequest = card => {
  return (dispatch, getState) => {
    // TODO: send request to server with card selection; Server then returns success and opponents selection, with an updated oponnet cards
    let { token } = getState();
    console.log("[spCounterRequest]", `Token: ${token} | Card: ${card}`);
    axios
      .post(`${baseURL}/sp/counter`, {
        token,
        card
      })
      .then(res => {
        console.log("[spCounterRequest]", "Received Response!");
        console.log(res.data);
        dispatch(spCounterResponse(res.data));
      });
  };
};

const spCounterResponse = data => {
  return {
    type: action.SP_COUNTER,
    payload: { ...data }
  };
};


export const spDiscardRequest = cards => {
  return (dispatch, getState) => {
    let { token } = getState();
    console.log("[spDiscardRequest]", `Token: ${token} | Cards: ${cards}`);
    axios
      .post(`${baseURL}/sp/discard`, {
        token,
        cards
      })
      .then(res => {
        console.log("[spDiscardRequest]", "Received Response!");
        console.log(res.data);
        dispatch(spDiscardResponse(res.data));
      });
  };
};

const spDiscardResponse = data => {
  return {
    type: action.SP_DISCARD,
    payload: { ...data }
  };
};
