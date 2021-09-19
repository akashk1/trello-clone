import * as actionTypes from "./actionTypes";
import cloneDeep from "lodash/cloneDeep";
const initialState = {
  lists: [],
};

const moveCard = (state, action) => {
  const to = action.to;
  const from = action.from;
  const card = action.card;
  const newList = cloneDeep(state.lists);
  const newCard = newList[from].cards[card];
  newList[from].cards = newList[from].cards.filter((_, index) => index != card);
  newList[to].cards.push(newCard);
  newList[to].cards.sort(
    (a, b) => new Date(b.creationTime) - new Date(a.creationTime)
  );
  localStorage.setItem("lists", JSON.stringify(newList));
  return {
    ...state,
    lists: newList,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LISTS:
      return {
        ...state,
        lists: action.lists,
      };
    case actionTypes.MOVE_CARD:
      return moveCard(state, action);
    default:
      return state;
  }
};

export default reducer;
