import {TreeItem, ChangeTreeItemRequestModel} from '../../../../services/types'

export interface OwnProps {
    item: TreeItem
}

export interface StateProps {
    inProgress: boolean,
    editedTreeItemId: number
}

export interface DispatchProps {
    changeValue: (model: ChangeTreeItemRequestModel) => void,
    setEditedTreeItemId: (editedTreeItemId: number) => void
}

export type Props = OwnProps & StateProps & DispatchProps