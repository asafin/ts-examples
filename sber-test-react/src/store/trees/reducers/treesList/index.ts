import {TreeList} from '../../../../services/types'
import {ActionTypes} from './../../types'
import {initialState} from './../index'
import {IActionCreator} from './../../actions'

export default (state = initialState.treesList, actions: IActionCreator<TreeList>) : TreeList => {
    return actions.type === ActionTypes.SET_TREES_LIST ? actions.payload : state 
}