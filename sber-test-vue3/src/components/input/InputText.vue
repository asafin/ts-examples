<template>
    <div :class="`${componentClass} ${hasErrorCls} ${hasDescriptionCls}`">
        <input 
            :type="inputType"
            :class="`${componentClass}__text-input`"
            :placeholder="placeholder"
            :disabled="disabled"
            @input="listener($event)"
            :value="value"
        />
        <div :class="`${componentClass}__description`" v-if="showDescription">
            {{ description }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type InputTypes = 'text' | 'password' | 'email' | 'tel'

const InputText = defineComponent({
    data(){
        return {
            componentClass: 'InputTextComponent'
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
        },
        error: {
            type: Boolean,
            required: false
        },
        value: {
            type: String,
            required: false
        }
    },
    emits: {
        onChange(text: string) {
            return text.length > 0
        }
    },
    computed: {
        hasErrorCls(): string {
            return this.error ? `${this.componentClass}_error` : ''
        },
        hasDescriptionCls(): string {
            return this.showDescription ? `${this.componentClass}_showDescription` : ''
        }
    },
    methods: {
        listener(event) {
            this.$emit('onChange', event.target.value)
        }         
    }
})

export default InputText;

</script>

<style lang="scss" scoped>
$input-border-default: $pale;
$input-border-focus: $wheat;
$input-border-radius: 3px;
$input-placeholder-color: $gray;
$input-error: $red;

.InputTextComponent {
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
    &_error {
        .InputTextComponent__text-input {
            border: 1px solid $input-error;
        }
        .InputTextComponent__description {
            color: $input-error;
        }
    }
}
</style>