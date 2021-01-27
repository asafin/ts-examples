<template>
  <div :class="componentClass">
    <NavigationComponent />
    <div :class="`${componentClass}__content container container_desktop`">
      <div :class="`${componentClass}__column ${componentClass}__column_left`">
          <CategoriesList />
      </div>
      <div :class="`${componentClass}__column ${componentClass}__column_right`">
        <TreesList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NavigationComponent from "./components/navigation/NavigationComponent.vue"
import CategoriesList from "./components/categories/list/CategoriesList.vue"
import TreesList from './components/trees/list/TreesList.vue'

@Options({
  components: {
    NavigationComponent,
    CategoriesList,
    TreesList
  },
})
export default class App extends Vue {
  private componentClass = "Application"
}
</script>

<style lang="scss">
.Application {
    height: 100vh;
    &__content {
        background: $grayLight;
        display: flex;
        height: calc(100% - 50px);
        justify-content: flex-start;
        align-items: stretch;
    }
    &__column {
        height: 100%;
    }
    &__column_left {
        width: 30%;
        border-right: 1px solid $pale;
    }
    &__column_right {
        flex-grow: 1;
    }
}
</style>
