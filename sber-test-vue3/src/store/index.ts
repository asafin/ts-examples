
import { Module, ModuleTree, createStore } from "vuex";
import {IRootStateModel} from './interfaces'
import categories from './modules/categories'
import trees from './modules/trees'
import {CategoriesStore} from './modules/categories/types'
import {TreesStore} from './modules/trees/types'

const modules: ModuleTree<IRootStateModel> = {
    categories,
    trees
};

const root: Module<IRootStateModel, IRootStateModel> = {
    modules
}

export const store = createStore<IRootStateModel>(root);

type StoreModules = {
    categories: CategoriesStore;
    trees: TreesStore;
}

export type Store = CategoriesStore<Pick<StoreModules, "categories">> &
    TreesStore<Pick<StoreModules, "trees">>