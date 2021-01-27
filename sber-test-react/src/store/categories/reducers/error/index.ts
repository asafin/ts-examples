import {ActionTypes} from './../../types'
import {initialState} from './../index'
import { Action } from 'redux'

export default (state = initialState.error, action: Action) : boolean => {
    return action.type === ActionTypes.HAS_ERROR ? true : state
}