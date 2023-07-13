import { createStore, applyMiddleware, compose } from "redux";
import combinedReducer from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewares = [thunk];
let store = null;
if (process.env.NODE_ENV === "development") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = composeEnhancers(applyMiddleware(...middlewares));
  store = createStore(combinedReducer, enhancers);
  middlewares.push(logger);
} else {
  store = createStore(combinedReducer, applyMiddleware(...middlewares));
}

export default store;
