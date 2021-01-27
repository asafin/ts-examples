import {ActionTypes} from './../../types'
import {initialState} from './../index'
import {IActionCreator} from './../../actions'
import {CategoryMenuItem} from './../../../../services/types'

export default (state = initialState.categoriesList, action: IActionCreator<CategoryMenuItem []>) : CategoryMenuItem [] => {
    return action.type === ActionTypes.SET_CATEGORIES_LIST ? action.payload : state
}