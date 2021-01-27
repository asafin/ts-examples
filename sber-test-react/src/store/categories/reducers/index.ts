import {combineReducers} from 'redux'
import {ICategoriesReducerModel} from '../../interfaces'

import categoriesList from './categoriesList'
import error from './error'
import dataIsLoading from './dataIsLoading'

export const initialState : ICategoriesReducerModel = {
    dataIsLoading: false,
    categoriesList: [],
    error: false
}

export default combineReducers<ICategoriesReducerModel>({
    categoriesList,
    dataIsLoading,
    error
})
