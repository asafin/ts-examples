import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import categories from './categories/reducers'
import trees from './trees/reducers'

const rootReducer = combineReducers({
    categories,
    trees
})

export type RootState = ReturnType<typeof rootReducer>
export type RootThunkDispatch = ThunkDispatch<RootState, undefined, Action>;

export const configureStore = () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
    return store
}