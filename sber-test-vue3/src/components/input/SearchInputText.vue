<template>
    <div :class="`${componentClass} ${hasDescriptionCls}`">
        <div :class="`${componentClass}__wrapper`">
            <input 
                :type="inputType"
                :class="`${componentClass}__text-input`"
                :placeholder="placeholder"
                :disabled="disabled"
                @change="listener"
                v-model="inputValue"
            />
            <div className="searchInputIcon">
                <font-awesome-icon :icon="searchIcon" v-on:click="listener"/>
            </div>            
        </div>        
        <div :class="`${componentClass}__description`" v-if="showDescription">
            {{ description }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type InputTypes = 'text' | 'password' | 'email' | 'tel'

export default defineComponent({
    data(){
        return {
            componentClass: 'SearchInputTextComponent',
            inputValue: '',
            searchIcon: faSearch
        }
    },
    props: {
        placeholder: {
            type: String,
            required: false,
            default: ''
        },
        disabled: {
            type: Boolean,
            required: false
        },
        description: {
            type: String,
            required: false,
            default: ''
        },
        showDescription: {
            type: Boolean,
            required: false,
            default: false
        },
        inputType: {
            type: String as PropType<InputTypes>,
            required: false,
            default: 'text'
        }
    },
    emits: {
        onEnter(text: string) {
            return text.length > 3
        }
    },
    computed: {
        hasDescriptionCls(): string {
            return this.showDescription ? `${this.componentClass}_showDescription` : ''
        }
    },
    methods: {
        listener() {
            this.$emit('onEnter', this.inputValue)
        }         
    }
})

</script>

<style lang="scss" scoped>
$input-border-default: $pale;
$input-border-focus: $wheat;
$input-border-radius: 3px;
$input-placeholder-color: $gray;
$input-error: $red;

.SearchInputTextComponent {
    $height: 34px;
    &__text-input {
        height: 30px;
        border: 1px solid $input-border-default;
        border-radius: $input-border-radius;
        box-shadow: none;
        box-sizing: border-box;
        box-shadow: none;
        padding: 0 10px;
        width: 100%; 
        &:focus {
            border: 1px solid $input-border-focus;
            outline: none;
        }
        &::placeholder {
            color: $input-placeholder-color;
        }
    }
    &__description {
        font-size: $p-font-size;
        color: $input-placeholder-color;
        padding-top: 8px;
    }
    &__wrapper {
        position: relative;
        .searchInputIcon {
            position: absolute;
            cursor: pointer;
            color: $gray;
            font-size: 16px;
            right: 10px;
            top: 50%;
            margin-top: -8px;
        }
    }
}
</style>