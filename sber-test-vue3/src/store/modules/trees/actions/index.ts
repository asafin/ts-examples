import { ActionTree, ActionContext } from 'vuex'
import {ITreesStateModel, IRootStateModel} from '../../../interfaces'
import { TreesMutations } from './../mutations'
import { ActionTypes } from './types'
import { MutationTypes } from './../mutations/types'
import {TreeList, ChangeTreeItemRequestModel} from '../../../../services/types'
import {getClient} from '../../../../services/client/clientProvider'
import { BaseClient } from '../../../../services/client/BaseClient'

type AugmentedActionTreesContext = {
    commit<K extends keyof TreesMutations>(
      key: K,
      payload: Parameters<TreesMutations[K]>[1]
    ): ReturnType<TreesMutations[K]>;
} & Omit<ActionContext<ITreesStateModel, IRootStateModel>, 'commit'>

export interface TreesActions {
    [ActionTypes.GET_EDITED_TREE_ITEM_ID](context: AugmentedActionTreesContext, editedTreeItemId: number): void;
    [ActionTypes.GET_TREES_LIST](context: AugmentedActionTreesContext, selectedRecordId: number): Promise<void>;
    [ActionTypes.CHANGE_TREE_ITEM_VALUE](context: AugmentedActionTreesContext, model: ChangeTreeItemRequestModel): Promise<void>;
    [ActionTypes.SEARCH_TREE_LIST](context: AugmentedActionTreesContext, search: string): Promise<void>;
}

const client: BaseClient = getClient();

export const actions: ActionTree<ITreesStateModel, IRootStateModel> & TreesActions = {
    async [ActionTypes.SEARCH_TREE_LIST]({ commit, getters }, search: string) {        
        commit(MutationTypes.SET_TREES_DATA_LOADING, true)

        try {
            const treesList: TreeList = await client.getTrees(getters.getTreesSelectedRecordId, search)
            commit(MutationTypes.SET_TREES_LIST, treesList)
            commit(MutationTypes.SET_TREES_DATA_LOADING, false)
        }
        catch(error) {
            console.log('searchTreeList', error)
            commit(MutationTypes.SET_TREES_DATA_ERROR, true)
            commit(MutationTypes.SET_TREES_DATA_LOADING, false)
        }
    },
    async [ActionTypes.CHANGE_TREE_ITEM_VALUE]({ commit, getters }, model: ChangeTreeItemRequestModel) {        
        commit(MutationTypes.SET_TREES_DATA_LOADING, true)
        try {
            const response: boolean = await client.editTreeItem(model)
            if (response) {
                const treesList: TreeList = await client.getTrees(getters.getTreesSelectedRecordId, '')
                commit(MutationTypes.SET_TREES_LIST, treesList)
                commit(MutationTypes.SET_TREES_DATA_LOADING, false)
                commit(MutationTypes.SET_EDITED_TREE_ITEM_ID, null)
            }
            else {
                throw new Error()
            }            
        }
        catch(error) {
            console.log('changeTreeItemId', error)
            commit(MutationTypes.SET_TREES_DATA_ERROR, true)
            commit(MutationTypes.SET_TREES_DATA_LOADING, false)
        }
    },
    async [ActionTypes.GET_TREES_LIST]({ commit }, selectedRecordId: number) {        
        commit(MutationTypes.SET_TREES_DATA_LOADING, true)
        commit(MutationTypes.SET_TREES_SELECTED_ID, selectedRecordId)
        
        try {
            const treesList: TreeList = await client.getTrees(selectedRecordId, '')
            commit(MutationTypes.SET_TREES_LIST, treesList)
            commit(MutationTypes.SET_TREES_DATA_LOADING, false)
        }
        catch(error) {
            console.log('getTreesList', error)
            commit(MutationTypes.SET_TREES_DATA_ERROR, true)
            commit(MutationTypes.SET_TREES_DATA_LOADING, false)
        }
    },
    [ActionTypes.GET_EDITED_TREE_ITEM_ID]({ commit }, editedTreeItemId: number) {      
        commit(MutationTypes.SET_EDITED_TREE_ITEM_ID, editedTreeItemId)
    }
}

