import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducers = combineReducers({
  trello: reducer,
});
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
