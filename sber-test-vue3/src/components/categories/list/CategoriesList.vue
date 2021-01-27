<template>
<div :class="componentClass">
    <div class="search">
        <SearchInputText description="Введите значение для поиска категории, субкатегории или пункта меню" :disabled="dataIsLoading" :showDescription="true" @onEnter="onSearchEnter"/>
    </div>
    <div class="content">
        <CategoryItem v-for="item in categoriesList" :key="JSON.stringify(item)" :item="item"/>
    </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { StoreActionTypes } from './../../../store/types'
import CategoryItem from './../item/Category.vue'
import SearchInputText from './../../input/SearchInputText.vue' 
import {CategoryMenuItem} from './../../../services/types'

@Options({
  components: {
    CategoryItem,
    SearchInputText
  },
})
export default class CategoriesList extends Vue {

    private componentClass = "CategoriesList"

    mounted() {        
        this.loadList()
    }

    async loadList(){
        await this.$store.dispatch(StoreActionTypes.GET_CATEGORIES_LIST, '')
    }

    get categoriesList(): CategoryMenuItem [] {
        return this.$store.getters.getCategoriesList
    }

    get dataIsLoading(): boolean {
        return this.$store.getters.isCategoriesDataLoading
    }

    async onSearchEnter(text: string) {
        await this.$store.dispatch(StoreActionTypes.GET_CATEGORIES_LIST, text)
    }
}
</script>

<style lang="scss" scoped>
.CategoriesList {
    padding: 20px 20px 0 0;
}

.search {
    margin-bottom: 20px;
}
</style>