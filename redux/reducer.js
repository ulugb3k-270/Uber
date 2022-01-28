import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";

export const initialState = {
  fromLocation: "",
  toLocation: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FROM_ACTION":
      return {
        ...state,
        fromLocation: action.payload,
      };

    case "TO_ACTION":
      return {
        ...state,
        toLocation: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

const initialStore = () => {
  return createStore(reducer);
};

export const wrapper = createWrapper(initialStore);
