<template>
<div :class="`${componentClass} ${contentVisibleClass}`">
    <div class="title" @click="setShow">
        <font-awesome-icon :icon="caretDown" class="title__icon title__icon_caret" />
        <font-awesome-icon :icon="folderOpen" class="title__icon title__icon_folder" v-if="showContent" />
        <typography variant="h3-title">
            {{ item.title }}
        </typography>
        <typography variant="p">
            {{ getStatus(item.status) }}
        </typography>
    </div>
    <div class="content">
        <TreeItem v-for="i in item.items" :key="JSON.stringify(i)" :item="i"/>
    </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PropType } from 'vue'
import { faFolderOpen, faFolder, faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {Tree, TreeStatus} from './../../../services/types'
import TreeItem from './TreeItem.vue'

@Options({
    props: {
        item: Object as PropType<Tree>
    },
    components: {
        TreeItem
    }
})
export default class TreeComponent extends Vue {
    private showContent = true
    private componentClass = "Tree"
    private folderOpen: IconDefinition = faFolderOpen
    private folder: IconDefinition = faFolder
    private caretDown: IconDefinition = faCaretDown

    get contentVisibleClass (): string {
        return this.showContent ? 'show' : 'hide'
    }

    setShow () {
        this.showContent = !this.showContent
    }

    getStatus = (status: TreeStatus): string => {
        let text = ''

        if (status == "active") {
            text = 'Активный'
        }
        else if (status == "decline") {
            text = 'Отклонён'
        }
        else if (status == "edit") {
            text = 'Редактирование'
        }
        else if (status == "onApproval") {
            text = 'На согласовании'
        }

        return text
    }
}

</script>
<style lang="scss" scoped> 
.Tree {
    margin-bottom: 20px;    
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
    .p {
        margin-left: auto;
    }
}
.title__icon {
    margin-right: 10px;
}
.title__icon_folder {
    color: $yellow;
}
</style>