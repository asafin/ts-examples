import {ActionTypes} from './../../types'
import {initialState} from './../index'
import { Action } from 'redux'

export default (state = initialState.error, actions: Action): boolean => {
    return actions.type === ActionTypes.HAS_ERROR ? true : state
}