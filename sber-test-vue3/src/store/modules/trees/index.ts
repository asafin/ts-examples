import { Module } from 'vuex'
import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import {ITreesStateModel, IRootStateModel} from './../../interfaces'

const trees: Module<ITreesStateModel, IRootStateModel> = {
    state,
    getters,
    mutations,
    actions
};

export default trees;
