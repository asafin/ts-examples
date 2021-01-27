import {CategoryMenuItem, TreeList} from './../services/types'

export interface ICategoriesStateModel {
    dataIsLoading: boolean,
    error: boolean,
    categoriesList: CategoryMenuItem []
}

export interface ITreesStateModel {
    dataIsLoading: boolean,
    error: boolean,
    treesList: TreeList,
    selectedRecordId: number,
    editedTreeItemId: number
}

export interface IRootStateModel {
    categories: ICategoriesStateModel,
    trees: ITreesStateModel
}
