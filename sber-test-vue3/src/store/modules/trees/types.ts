import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
} from 'vuex'
import { TreesGetters } from './getters'
import { TreesMutations } from './mutations'
import { TreesActions } from './actions'
import {ITreesStateModel} from './../../interfaces'

export type TreesStore<S = ITreesStateModel> = Omit<
    VuexStore<S>,
    'getters' | 'commit' | 'dispatch'
    > & {
    commit<K extends keyof TreesMutations, P extends Parameters<TreesMutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<TreesMutations[K]>;
    } & {
    dispatch<K extends keyof TreesActions>(
        key: K,
        payload: Parameters<TreesActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<TreesActions[K]>;
    } & {
    getters: {
        [K in keyof TreesGetters]: ReturnType<TreesGetters[K]>
    };
}


