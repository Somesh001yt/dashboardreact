import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import logger from "redux-logger"; 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  reducer: rootReducer, 
  middleware: [logger], 
}, composeEnhancers);

export default store;
