<template>
<div :class="componentClass">
    <div class="search">
        <SearchInputText description="Введите значение для поиска дерева или свойства дерева" :disabled="dataIsLoading" :showDescription="true" @onEnter="onSearchEnter"/>
    </div>
    <div class="content" v-if="hasList">
        <div class="content__header">
            <typography variant="h2-title">
                {{ getTitle }}
            </typography>
        </div>
        <div class="content__list">
            <TreeComponent v-for="item in treeList.items" :key="JSON.stringify(item)" :item="item"/>
        </div>
    </div>
    <div class="empty-message" v-else>
        <typography variant="h3-title">
            Выберите категорию      
        </typography>
    </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import * as utils from './../../../services/utils'
import {TreeList} from './../../../services/types'
import { StoreActionTypes } from './../../../store/types'
import SearchInputText from './../../input/SearchInputText.vue' 
import TreeComponent from './../item/Tree.vue'

@Options({
    components: {
        SearchInputText,
        TreeComponent
    }
})
export default class TreesList extends Vue {
    private componentClass = "TreesList"

    get hasList(): boolean {
        return !utils.isEmptyObj(this.treeList)
    }

    get treeList(): TreeList {
        return this.$store.getters.getTreesList
    }

    get getTitle(): string {
        return this.treeList.title
    }

    get dataIsLoading(): boolean {
        return this.$store.getters.isTreesDataLoading
    }

    async onSearchEnter(text: string){
        await this.$store.dispatch(StoreActionTypes.SEARCH_TREE_LIST, text)
    }
}
</script>

<style lang="scss" scoped>
.TreesList {
    padding: 20px 0 0 20px;
}

.search {
    margin-bottom: 20px;
}
</style>