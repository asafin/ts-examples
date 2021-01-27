import { GetterTree } from 'vuex'
import {CategoryMenuItem} from '../../../../services/types'
import {ICategoriesStateModel, IRootStateModel} from './../../../interfaces'

export type CategoriesGetters = {
    isCategoriesDataError(state: ICategoriesStateModel): boolean;
    isCategoriesDataLoading(state: ICategoriesStateModel): boolean;
    getCategoriesList(state: ICategoriesStateModel): CategoryMenuItem [];
}

export const getters: GetterTree<ICategoriesStateModel, IRootStateModel> & CategoriesGetters = {
    isCategoriesDataLoading: (state: ICategoriesStateModel) => {
        return state.dataIsLoading
    },
    isCategoriesDataError: (state: ICategoriesStateModel) => {
        return state.error
    },
    getCategoriesList: (state: ICategoriesStateModel) => {
        return state.categoriesList
    }
}