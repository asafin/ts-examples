<template>
    <div :class="`${className} ${isSelected}`" v-on:click="handleMenuItemClick">
        <font-awesome-icon :icon="file" />
        <typography variant="p">
            {{ item.title }}
        </typography>   
    </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { PropType } from 'vue'
import { faFile, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {MenuItem} from '../../../services/types'
import { StoreActionTypes } from './../../../store/types'

class Props {
  item = prop({
    type: Object as PropType<MenuItem>,
    required: true
  })
}

export default class Menu extends Vue.with(Props) {
    private className = "Menu"
    private file: IconDefinition = faFile

    handleMenuItemClick(){
        this.$store.dispatch(StoreActionTypes.GET_TREES_LIST, this.item.recordId)
    }

    get isSelected(): string {
        return this.$store.getters.getTreesSelectedRecordId === this.item.recordId ? `${this.className}__selected` : ''
    }

}
</script>

<style lang="scss" scoped>
.Menu {
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    &__selected {
        .p {
            border-bottom: 1px dashed $gray;
        }
    } 
    .p {
        margin-left: 7px;
        display: inline-block;
    }
}
</style>