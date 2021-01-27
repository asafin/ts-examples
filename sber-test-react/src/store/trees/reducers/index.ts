import {combineReducers} from 'redux'
import {ITreesReducerModel} from '../../interfaces'

import dataIsLoading from './dataIsLoading'
import treesList from './treesList'
import error  from './error'
import selectedRecordId from './selectedRecordId'
import editedTreeItemId from './editedTreeItemId'

export const initialState : ITreesReducerModel = {
    dataIsLoading: false,
    treesList: null,
    error: false,
    selectedRecordId: null,
    editedTreeItemId: null
}

export default combineReducers<ITreesReducerModel>({
    dataIsLoading,
    editedTreeItemId,
    error,
    selectedRecordId,
    treesList
})