import { MutationTree } from 'vuex'
import { MutationTypes } from './types'
import {ITreesStateModel} from './../../../interfaces'
import {TreeList} from '../../../../services/types'

export type TreesMutations<S = ITreesStateModel> = {
    [MutationTypes.SET_TREES_DATA_LOADING](state: S, payload: boolean): void;
    [MutationTypes.SET_TREES_DATA_ERROR](state: S, payload: boolean): void;
    [MutationTypes.SET_EDITED_TREE_ITEM_ID](state: S, payload: number): void;
    [MutationTypes.SET_TREES_SELECTED_ID](state: S, payload: number): void;
    [MutationTypes.SET_TREES_LIST](state: S, payload: TreeList): void;
}

export const mutations: MutationTree<ITreesStateModel> & TreesMutations = {
    [MutationTypes.SET_TREES_DATA_LOADING](state, payload: boolean) {
      state.dataIsLoading = payload
    },
    [MutationTypes.SET_TREES_DATA_ERROR](state, payload: boolean) {
        state.error = payload
    },
    [MutationTypes.SET_EDITED_TREE_ITEM_ID](state, payload: number) {
        state.editedTreeItemId = payload
    },
    [MutationTypes.SET_TREES_SELECTED_ID](state, payload: number) {
        state.selectedRecordId = payload
    },
    [MutationTypes.SET_TREES_LIST](state, payload: TreeList) {
        state.treesList = payload
    }
}