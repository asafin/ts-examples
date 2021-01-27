import { MutationTree } from 'vuex'
import { MutationTypes } from './types'
import {CategoryMenuItem} from '../../../../services/types'
import {ICategoriesStateModel} from './../../../interfaces'

export type CategoriesMutations<S = ICategoriesStateModel> = {
    [MutationTypes.SET_CATEGORIES_DATA_LOADING](state: S, payload: boolean): void;
    [MutationTypes.SET_CATEGORIES_LIST](state: S, payload: CategoryMenuItem []): void;
    [MutationTypes.SET_CATEGORIES_DATA_ERROR](state: S, payload: boolean): void;
}

export const mutations: MutationTree<ICategoriesStateModel> & CategoriesMutations = {
    [MutationTypes.SET_CATEGORIES_DATA_LOADING](state, payload: boolean) {
      state.dataIsLoading = payload
    },
    [MutationTypes.SET_CATEGORIES_LIST](state, payload: CategoryMenuItem []) {
        state.categoriesList = payload
    },
    [MutationTypes.SET_CATEGORIES_DATA_ERROR](state, payload: boolean) {
        state.error = payload
    }
}