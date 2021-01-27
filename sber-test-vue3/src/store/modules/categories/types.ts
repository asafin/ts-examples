import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
} from 'vuex'
import { CategoriesGetters } from './getters'
import { CategoriesMutations } from './mutations'
import { CategoriesActions } from './actions'
import {ICategoriesStateModel} from './../../interfaces'

export type CategoriesStore<S = ICategoriesStateModel> = Omit<
    VuexStore<S>,
    'getters' | 'commit' | 'dispatch'
    > & {
    commit<K extends keyof CategoriesMutations, P extends Parameters<CategoriesMutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<CategoriesMutations[K]>;
    } & {
    dispatch<K extends keyof CategoriesActions>(
        key: K,
        payload: Parameters<CategoriesActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<CategoriesActions[K]>;
    } & {
    getters: {
        [K in keyof CategoriesGetters]: ReturnType<CategoriesGetters[K]>
    };
}


