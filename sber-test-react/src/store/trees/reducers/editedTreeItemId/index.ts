import {ActionTypes} from './../../types'
import {initialState} from './../index'
import {IActionCreator} from './../../actions'

export default (state = initialState.editedTreeItemId, actions: IActionCreator<number>) : number => {
    return actions.type === ActionTypes.SET_EDITED_TREE_ITEM_ID ? actions.payload : state
}