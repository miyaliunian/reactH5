/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  redux-store并结合ReactDevTool
 */
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import promise from 'redux-promise'
// import createSagaMiddleware from 'redux-saga'
// import sagas from './sagas'
import api from "./middleware/api";
import rootReducer from "./modules";
// const sagaMiddleware = createSagaMiddleware()
let store;

if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  store = createStore(rootReducer, applyMiddleware(thunk, api));
} else {
  store = createStore(rootReducer, applyMiddleware(thunk, api));
}

// sagaMiddleware.run(sagas)

export default store;
