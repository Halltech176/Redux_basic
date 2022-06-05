const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const bindAction = redux.bindActionCreators;

const logger = reduxLogger.createLogger()

const CAKE_ORDERED = "CAKE_ORDERED";
const ICECREAM_ORDERED ='ICECREAM_ORDERED'

function orderIcecream(qty = 5) {
    return {
        type : ICECREAM_ORDERED,
        payload : qty
    }
}

function addIceCream(qty = 1) {
    return {
        type : 'ADD_ICECREAM',
        payload : qty
    }
}

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}
function cakeAdd(qty = 4) {
  return {
    type: "CAKE_ADDED",
    payload: qty,
  };
}
const initial_cake_state = {
  numCake: 10
};

const initial_icecream_state = {
    numIce : 15
}
const CakeReducer = (state = initial_cake_state, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numCake: state.numCake - action.payload,
      };
    case "CAKE_ADDED":
      return {
        ...state,
        numCake: state.numCake + action.payload,
      };
    default:
      return state;
  }
};

const IceCreamReducer = (state= initial_icecream_state, action) => {
    switch(action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numIce : state.numIce - action.payload

            }
        case "ADD_ICECREAM" :
            return {
                ...state,
                numIce : state.numIce + action.payload
            }
        default :
        return state
    }
}
const rootReducers = combineReducers({
    cake : CakeReducer,
    icecream : IceCreamReducer
})
const store = redux.createStore(rootReducers, applyMiddleware(logger));

console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() => {})

const actions = bindAction({ orderCake, cakeAdd , orderIcecream, addIceCream}, store.dispatch);
actions.orderCake();
actions.cakeAdd();
actions.orderIcecream();

unsubscribe();
