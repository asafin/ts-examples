import { Module } from 'vuex'
import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import {ICategoriesStateModel, IRootStateModel} from './../../interfaces'

const categories: Module<ICategoriesStateModel, IRootStateModel> = {
    state,
    getters,
    mutations,
    actions
};

export default categories;
