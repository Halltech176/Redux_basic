const redux = require("redux");
const createStore = redux.createStore;
const reduxLogger = require('redux-logger')
const applyMid = redux.applyMiddleware

const logger = reduxLogger.createLogger()

const add_message = () => {
  return {
    type: "ADD_MESSAGE",
  };
};
const remove_message = () => {
  return {
    type: "REMOVE_MESSAGE",
  };
};
const initial_state = {
  messsage: 10,
};

const Reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messsage: state.messsage + 1,
      };
    case "REMOVE_MESSAGE":
      return {
        ...state,
        messsage: state.messsage - 1,
      };

    default:
      return state;
  }
};
const store = createStore(Reducer, applyMid(logger));
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() =>{})
store.dispatch(add_message());
store.dispatch(add_message());
store.dispatch(add_message());
store.dispatch(add_message());
store.dispatch(remove_message());
// console.log(unsubscribe);
