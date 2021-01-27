<template>
    <div :class="`${className} ${showContent ? 'show' : 'hide'}`">
        <div class="title" v-on:click="setShow">
            <font-awesome-icon :icon="caretDown" class="title__icon title__icon_caret" />
            <font-awesome-icon :icon="layerGroup" class="title__icon" />
            <typography variant="h3-title">
                {{ item.title }}
            </typography>
        </div>
        <div class="content">
            <Menu v-for="i in item.items" :key="JSON.stringify(i)" :item="i"/>
        </div>    
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PropType } from 'vue'
import { faLayerGroup, faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {SubCategoryMenuItem} from '../../../services/types'
import Menu from './Menu.vue'

@Options({
    props: {
        item: Object as PropType<SubCategoryMenuItem>
    },
    components: {
        Menu
    }
})
export default class SubCategory extends Vue {
    private className = "SubCategory"
    private showContent = false
    private layerGroup: IconDefinition = faLayerGroup
    private caretDown: IconDefinition = faCaretDown

    setShow() {
        this.showContent = !this.showContent
    }
}
</script>

<style lang="scss" scoped>
.SubCategory {
    margin-bottom: 10px;
    &.hide {
        .content {
            display: none;
        }
        .title__icon_caret {
            transform: rotate(-90deg)
        }
    }    
}

.content {
    padding-left: 25px;
}
.title {
    font-size: $base-font-size;
    color: $gray;
    display: flex;
    height: 30px;
    align-items: center;
    cursor: pointer;    
}
.title__icon {
    margin-right: 10px;
}
</style>