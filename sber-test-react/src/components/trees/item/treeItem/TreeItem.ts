import * as I from './ITreeItem'
import { connect } from 'react-redux'
import {ChangeTreeItemRequestModel} from '../../../../services/types'
import {RootState, RootThunkDispatch} from '../../../../store'
import {changeTreeItemValue, setEditedTreeItemId} from '../../../../store/trees/actions'
import {TreeItemComponent} from './TreeItemComponent'

const mapStateToProps = (state: RootState) : I.StateProps => ({
    inProgress: state.trees.dataIsLoading,
    editedTreeItemId: state.trees.editedTreeItemId
})

const mapDispatchToProps = (dispatch: RootThunkDispatch) : I.DispatchProps => ({
    changeValue: (model: ChangeTreeItemRequestModel) => dispatch(changeTreeItemValue(model)),
    setEditedTreeItemId: (editedTreeItemId: number) => dispatch(setEditedTreeItemId(editedTreeItemId))
});

export default connect<I.StateProps, I.DispatchProps, I.OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(TreeItemComponent)