import {ITreesStateModel} from '../../interfaces'

export const state: ITreesStateModel = {
  dataIsLoading: false,
    treesList: null,
    error: false,
    selectedRecordId: null,
    editedTreeItemId: null
}
