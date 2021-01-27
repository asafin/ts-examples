import { connect } from 'react-redux'

import {RootState, RootThunkDispatch} from './../../../store'
import {getCategoriesList} from './../../../store/categories/actions'
import * as I from './ICategoriesList'
import {CategoriesListComponent} from './CategoriesListComponent'

const mapStateToProps = (state: RootState) : I.StateProps => ({
    list: state.categories.categoriesList,
    dataIsLoading: state.categories.dataIsLoading
})

const mapDispatchToProps = (dispatch: RootThunkDispatch) : I.DispatchProps => ({
    getCategoriesList: (search: string) => dispatch(getCategoriesList(search))
});

export default connect<I.StateProps, I.DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesListComponent)