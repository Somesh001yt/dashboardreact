import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer, 
   middleware: [sagaMiddleware], 
  
}, composeEnhancers);
sagaMiddleware.run(rootSaga);

export default store;


