import { connect } from 'react-redux'
import * as I from './ITreesList'
import {RootState, RootThunkDispatch} from './../../../store'
import {searchTreeList} from '../../../store/trees/actions'

import {TreesListComponent} from './TreesListComponent'

const mapStateToProps = (state: RootState) : I.StateProps => ({
    list: state.trees.treesList,
    items: state.trees.treesList ? state.trees.treesList.items : [],
    dataIsLoading: state.trees.dataIsLoading
})

const mapDispatchToProps = (dispatch: RootThunkDispatch) : I.DispatchProps => ({
    searchTreeList: (search: string) => dispatch(searchTreeList(search))
});

export default connect<I.StateProps, I.DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(TreesListComponent)