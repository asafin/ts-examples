import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import {TreeList, ChangeTreeItemRequestModel} from '../../../services/types'

import { BaseClient } from '../../../services/client/BaseClient'
import {getClient} from '../../../services/client/clientProvider'

import {ActionTypes} from './../types'
import {RootState} from '../../index'

import {IBaseActionCreator} from './../../interfaces'

type TreesThunkResultModel<R> = ThunkAction<R, RootState, undefined, Action>

let client : BaseClient = getClient();

export interface IActionCreator<P> extends IBaseActionCreator<ActionTypes, P> {
    type: ActionTypes;
    payload: P;
}

export function actionCreator<T>(actionType: ActionTypes, data: T): IActionCreator<T> {
    return {
        type: actionType,
        payload: data
    }
}

const setDataLoading = (isLoading: boolean) : IActionCreator<boolean> => {
    return actionCreator<boolean>(ActionTypes.SET_DATA_LOADING, isLoading)
} 

const setHasError = () : Action => ({type: ActionTypes.HAS_ERROR}) 

const handleError = () => {
    return (dispatch : any) => {
        dispatch(setDataLoading(false))
        dispatch(setHasError())
    }    
}

const setTreesList = (treesList: TreeList) : IActionCreator<TreeList> => {
    return actionCreator(ActionTypes.SET_TREES_LIST, treesList)
}
const setSelectedRecordId = (selectedRecordId: number) : IActionCreator<number> => {
    return actionCreator(ActionTypes.SET_SELECTED_ID, selectedRecordId)
}

export const setEditedTreeItemId = (editedTreeItemId: number) : IActionCreator<number> => {
    return actionCreator(ActionTypes.SET_EDITED_TREE_ITEM_ID, editedTreeItemId)
}

export const getTreeList = (selectedRecordId: number) : TreesThunkResultModel<Promise<void>> => async dispatch => {
    
    dispatch(setSelectedRecordId(selectedRecordId))
    dispatch(setDataLoading(true))

    try {
        let treesList : TreeList = await client.getTrees(selectedRecordId)

        dispatch(setTreesList(treesList))
        dispatch(setDataLoading(false))
    }
    catch(error: any){
        console.log('getTreeList', error)
        dispatch(handleError())
    }
}

export const changeTreeItemValue = (model: ChangeTreeItemRequestModel) : TreesThunkResultModel<Promise<void>> => async (dispatch, getState) => {
    dispatch(setDataLoading(true))

    try{
        let response : boolean = await client.editTreeItem(model)

        if (response) {
            let treesList : TreeList = await client.getTrees(getState().trees.selectedRecordId)

            dispatch(setTreesList(treesList))
            dispatch(setDataLoading(false))
            dispatch(setEditedTreeItemId(null))
        }
        else {
            throw new Error()
        }
        
    }
    catch(error: any){
        console.log('changeTreeItemValue', error)
        dispatch(handleError())
    }
}

export const searchTreeList = (search: string) : TreesThunkResultModel<Promise<void>> => async (dispatch, getState) => {
    dispatch(setDataLoading(true))

    try{
        let treesList : TreeList = await client.getTrees(getState().trees.selectedRecordId, search)

        dispatch(setTreesList(treesList))
        dispatch(setDataLoading(false))
        
    }
    catch(error: any){
        console.log('changeTreeItemValue', error)
        dispatch(handleError())
    }
}