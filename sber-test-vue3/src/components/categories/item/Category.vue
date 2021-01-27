<template>
    <div :class="`${className} ${showContent ? 'show' : 'hide'}`">
        <div class="title" @click="setShow">
            <font-awesome-icon :icon="caretDown" class="title__icon title__icon_caret" />
            <font-awesome-icon :icon="folderOpen" class="title__icon title__icon_folder" v-if="showContent" />
            <font-awesome-icon :icon="folder" class="title__icon title__icon_folder" v-else/>
            <typography variant="h3-title">
                {{ item.title }}
            </typography>
        </div>
        <div class="content">
            <SubCategory v-for="i in item.items" :key="JSON.stringify(i)" :item="i"/>
        </div>    
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PropType } from 'vue'
import { faFolderOpen, faFolder, faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {CategoryMenuItem} from '../../../services/types'
import SubCategory  from './SubCategory.vue'

@Options({
    props: {
        item: Object as PropType<CategoryMenuItem>
    },
    components: {
        SubCategory
    }
})
export default class Category extends Vue {
    private className = "Category"
    private showContent = false
    private folderOpen: IconDefinition = faFolderOpen
    private folder: IconDefinition = faFolder
    private caretDown: IconDefinition = faCaretDown

    setShow() {
        this.showContent = !this.showContent
    }
}
</script>

<style lang="scss" scoped>
.Category {
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
    padding-left: 20px;
}
.title {
    font-size: $base-font-size;
    display: flex;
    height: 30px;
    align-items: center;
    cursor: pointer;
    
}
.title__icon {
    margin-right: 10px;
}
.title__icon_folder {
    color: $yellow;
}
</style>