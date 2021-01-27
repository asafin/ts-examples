import { GetterTree } from 'vuex'
import {ITreesStateModel, IRootStateModel} from './../../../interfaces'
import {TreeList} from '../../../../services/types'

export type TreesGetters = {
    isTreesDataError(state: ITreesStateModel): boolean;
    isTreesDataLoading(state: ITreesStateModel): boolean;
    getTreesList(state: ITreesStateModel): TreeList;
    getTreesSelectedRecordId(state: ITreesStateModel): number;
    getTreeEditedItemRecordId(state: ITreesStateModel): number;
}

export const getters: GetterTree<ITreesStateModel, IRootStateModel> & TreesGetters = {
    isTreesDataLoading: (state: ITreesStateModel) => {
        return state.dataIsLoading
    },
    isTreesDataError: (state: ITreesStateModel) => {
        return state.error
    },
    getTreesList: (state: ITreesStateModel) => {
        return state.treesList
    },
    getTreesSelectedRecordId: (state: ITreesStateModel) => {
        return state.selectedRecordId
    },
    getTreeEditedItemRecordId: (state: ITreesStateModel) => {
        return state.editedTreeItemId
    }
}