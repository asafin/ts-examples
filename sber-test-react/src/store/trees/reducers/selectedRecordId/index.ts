import {ActionTypes} from './../../types'
import {initialState} from './../index'
import {IActionCreator} from './../../actions'

export default (state = initialState.selectedRecordId, actions: IActionCreator<number>) : number => {
    return actions.type === ActionTypes.SET_SELECTED_ID ? actions.payload : state
}