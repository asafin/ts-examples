<template>
    <div :class="`${componentClass} ${variant}`" :title="title">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PropType } from 'vue'
import * as I from './ITypography'


@Options({
    props: {
        variant: String as PropType<I.TypoVariant>,
        title: String
    }
})
export default class Typography extends Vue {
    private componentClass = 'TypographyComponent'
}

</script>

<style lang="scss">
.h1-title {
    font-size: $h1-font-size;
    line-height: $h1-font-size;
}

.h2-title {
    font-size: $h2-font-size;
    line-height: 1.64;
}

.h3-title {
    font-size: $h3-font-size;
}

p, .p {
    font-size: $p-font-size;
    line-height: 1.92;
}
</style>