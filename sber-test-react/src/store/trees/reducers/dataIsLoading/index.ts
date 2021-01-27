import {ActionTypes} from './../../types'
import {initialState} from './../index'
import {IActionCreator} from './../../actions'

export default (state = initialState.dataIsLoading, action: IActionCreator<boolean>) : boolean => {
    return action.type === ActionTypes.SET_DATA_LOADING ? action.payload : state
}