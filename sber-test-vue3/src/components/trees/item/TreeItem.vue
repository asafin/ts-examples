<template>
<div :class="componentClass">
    <div class="title">
        {{item.title}}
    </div>
    <div class="value">
        <InputText :value="inputValue" @onChange="handleInputFieldChange" :disabled="dataIsLoading" v-if="checkEditedTreeItemId"/>
        <typography variant="p" v-else>
            {{ item.value }}
        </typography>
    </div>
    <div class="actions">
        <div v-if="checkEditedTreeItemId">
            <font-awesome-icon :icon="timesIcon" class="icon icon_cancel" @click="handleCancelIconClick" />
            <font-awesome-icon :icon="saveIcon" class="icon icon_save" @click="handleEditIconClick" />
        </div>
        <font-awesome-icon :icon="pencilAlt" class="icon icon_edit" @click="setEditedTreeItemId" v-else />
    </div>
</div>
</template>
<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import { PropType } from 'vue'
import { faPencilAlt, faSave, faTimes, IconDefinition  } from '@fortawesome/free-solid-svg-icons'
import {TreeItem, ChangeTreeItemRequestModel} from './../../../services/types'
import InputText from './../../input/InputText.vue'
import { StoreActionTypes } from '@/store/types'

class Props {
    item = prop({
        type: Object as PropType<TreeItem>,
        required: true
    })
}

@Options({
    components: {
        InputText
    }
})
export default class TreeItemComponent extends Vue.with(Props) {
    private componentClass = "TreeItem"
    private pencilAlt: IconDefinition = faPencilAlt
    private saveIcon: IconDefinition = faSave
    private timesIcon: IconDefinition = faTimes
    private inputValue = ''

    mounted() {
        this.inputValue = this.item.value.toString()
    }

    handleInputFieldChange(text: string) {
        this.inputValue = text
    }

    createChangeTreeItemRequestModel(): ChangeTreeItemRequestModel {
        return {
            recordId: this.item.recordId,
            value: parseInt(this.inputValue)
        }
    }

    async handleEditIconClick() {
        await this.$store.dispatch(StoreActionTypes.CHANGE_TREE_ITEM_VALUE, this.createChangeTreeItemRequestModel())
    }

    handleCancelIconClick() {
        this.inputValue = this.item.value.toString()
        this.$store.dispatch(StoreActionTypes.GET_EDITED_TREE_ITEM_ID, null)
    }

    setEditedTreeItemId() {
        this.$store.dispatch(StoreActionTypes.GET_EDITED_TREE_ITEM_ID, this.item.recordId)
    }

    get dataIsLoading(): boolean {
        return this.$store.getters.isTreesDataLoading
    }
    
    get checkEditedTreeItemId(): boolean {
        return this.$store.getters.getTreeEditedItemRecordId == this.item.recordId
    }
}
</script>
<style lang="scss" scoped>
.TreeItem {
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 14px;
    border-bottom: 1px solid $pale;  
}

.title {
    width: 50%;
}
.value {
    width: 25%;
    .InputTextComponent {            
        margin-left: -11px;
    }
}
.actions {
    width: 25%;
}
.icon {
    cursor: pointer;
    margin-left: 20px;
    color: $gray;
}
</style>