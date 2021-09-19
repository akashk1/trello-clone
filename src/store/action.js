import * as actionTypes from "./actionTypes";

export const setList = (lists) => {
  return {
    type: actionTypes.SET_LISTS,
    lists,
  };
};

export const moveCard = (from, to, card) => {
  return {
    type: actionTypes.MOVE_CARD,
    from,
    to,
    card,
  };
};
