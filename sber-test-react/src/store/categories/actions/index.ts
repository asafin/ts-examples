import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import {CategoryMenuItem} from './../../../services/types'

import { BaseClient } from '../../../services/client/BaseClient'
import {getClient} from '../../../services/client/clientProvider'

import {ActionTypes} from '../types'
import {RootState} from './../../index'

import {IBaseActionCreator} from './../../interfaces'

type CategoriesThunkResultModel<R> = ThunkAction<R, RootState, undefined, Action>

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

const setCategoriesList = (categoriesList: CategoryMenuItem []) : IActionCreator<CategoryMenuItem []> => {
    return actionCreator<CategoryMenuItem []>(ActionTypes.SET_CATEGORIES_LIST, categoriesList)
}

const setHasError = () : Action => ({type: ActionTypes.HAS_ERROR}) 

const handleError = () => {
    return (dispatch : any) => {
        dispatch(setDataLoading(false))
        dispatch(setHasError())
    }    
}

export const getCategoriesList = (search ?: string) : CategoriesThunkResultModel<Promise<void>> => async dispatch => {
    dispatch(setDataLoading(true))

    try {
        let categoriesList : CategoryMenuItem [] = await client.getCategoryList(search)

        dispatch(setCategoriesList(categoriesList))
        dispatch(setDataLoading(false))
    }
    catch(error: any){
        console.log('getCategoriesList', error)
        dispatch(handleError())
    }
}
