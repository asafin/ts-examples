import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { userAutentificationReducer } from './userAutentification/reducers'
import {userProfileReducer} from './userProfile/reducers'

const rootReducer = combineReducers({
    userAutentification: userAutentificationReducer,
    userProfile: userProfileReducer
})

export type RootState = ReturnType<typeof rootReducer>

export type RootThunkDispatch = ThunkDispatch<RootState, undefined, Action>;

export const configureStore = () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
    return store
}
