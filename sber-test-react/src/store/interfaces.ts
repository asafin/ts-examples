import {CategoryMenuItem, TreeList} from './../services/types'

export interface ICategoriesReducerModel {
    dataIsLoading: boolean,
    error: boolean,
    categoriesList: CategoryMenuItem []
}

export interface ITreesReducerModel {
    dataIsLoading: boolean,
    error: boolean,
    treesList: TreeList,
    selectedRecordId: number,
    editedTreeItemId: number
}

export interface IBaseActionCreator<T, P> {
    type: T;
    payload: P;
}
