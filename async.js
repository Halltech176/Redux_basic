const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunk = require('redux-thunk').default
const axios = require('axios')

const initial_state = {
    loading : true,
    users : [],
    error : ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCEDDED = 'FETCH_USERS_SUCCEDDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest =  () => {
    return {
        type : FETCH_USERS_REQUEST
    }
}
const fetchUsersSucceded = (users) => {
    return {
        type : FETCH_USERS_SUCCEDDED,
        payload : users
    }
}
const fetchUsersFailed = (error) => {
    return {
        type : FETCH_USERS_FAILED,
        payload : error
    }
}

const Reducer = (state = initial_state, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state, 
                loading : true
            }
        case FETCH_USERS_SUCCEDDED:
            return {
                ...state,
                loading : false,
                users : action.payload,
                error : ''
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading : false,
                error : action.payload,
                users : []
            }
    }
}
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
            const users = response.data.map((user) => user.username)
            dispatch(fetchUsersSucceded(users))
        })
        .catch((error) => {
            dispatch(fetchUsersFailed(error.message))
        })
    }
}

const store = createStore(Reducer, applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())
