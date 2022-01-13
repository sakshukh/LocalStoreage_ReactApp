import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import userReducer from './users/userReducer'

const rootReducer = combineReducers({
    user: userReducer
})

const store = createStore(rootReducer, applyMiddleware(logger, thunk))
// store.subscribe(() => { console.log(store.getState()); })

export default store