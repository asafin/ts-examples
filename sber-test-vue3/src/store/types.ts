import {ActionTypes as CategoriesActionTypes } from './modules/categories/actions/types'
import {MutationTypes as CategoriesMutationTypes} from './modules/categories/mutations/types'
import {ActionTypes as TreesActionTypes} from './modules/trees/actions/types'
import {MutationTypes as TreesMutationTypes} from './modules/trees/mutations/types'

export const StoreActionTypes = {
    ...CategoriesActionTypes,
    ...TreesActionTypes
}

export const StoreMutationTypes = {
    ...CategoriesMutationTypes,
    ...TreesMutationTypes
}