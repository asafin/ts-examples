import { ActionTree, ActionContext } from 'vuex'
import {ICategoriesStateModel, IRootStateModel} from '../../../interfaces'
import { CategoriesMutations } from './../mutations'
import { ActionTypes } from './types'
import { MutationTypes } from './../mutations/types'
import {CategoryMenuItem} from '../../../../services/types'
import {getClient} from '../../../../services/client/clientProvider'
import { BaseClient } from '../../../../services/client/BaseClient'

type AugmentedActionCategoriesContext = {
    commit<K extends keyof CategoriesMutations>(
      key: K,
      payload: Parameters<CategoriesMutations[K]>[1]
    ): ReturnType<CategoriesMutations[K]>;
} & Omit<ActionContext<ICategoriesStateModel, IRootStateModel>, 'commit'>

export interface CategoriesActions {
    [ActionTypes.GET_CATEGORIES_LIST](context: AugmentedActionCategoriesContext, search: string): Promise<void>;
}

const client: BaseClient = getClient();

export const actions: ActionTree<ICategoriesStateModel, IRootStateModel> & CategoriesActions = {
    async [ActionTypes.GET_CATEGORIES_LIST]({ commit }, search: string) {                
        commit(MutationTypes.SET_CATEGORIES_DATA_LOADING, true)

        try {
            const categoriesList: CategoryMenuItem [] = await client.getCategoryList(search)
            commit(MutationTypes.SET_CATEGORIES_LIST, categoriesList)
            commit(MutationTypes.SET_CATEGORIES_DATA_LOADING, false)
        }
        catch(error) {
            console.log('getCategoriesList', error)
            commit(MutationTypes.SET_CATEGORIES_DATA_ERROR, true)
            commit(MutationTypes.SET_CATEGORIES_DATA_LOADING, false)
        }
    },
}

