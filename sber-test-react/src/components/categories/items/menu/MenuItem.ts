import {RootState, RootThunkDispatch} from './../../../../store'
import {getTreeList} from './../../../../store/trees/actions'
import { connect } from 'react-redux'
import * as I from './IMenuItem'
import {MenuItemComponent} from './MenuItemComponent'

const mapStateToProps = (state: RootState) : I.StateProps => ({
    selectedRecordId: state.trees.selectedRecordId
})

const mapDispatchToProps = (dispatch: RootThunkDispatch) : I.DispatchProps => ({
    handleMenuItemClick: (selectedRecordId: number) => dispatch(getTreeList(selectedRecordId))
})

export default connect<I.StateProps, I.DispatchProps, I.OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(MenuItemComponent)