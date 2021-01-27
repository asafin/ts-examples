<template>
    <div :class="className">
        <div class="content container container_desktop">
            <div class="column column_left">
                <div class="logo">
                    <font-awesome-icon :icon="spa" class="logo__icon" />
                    <div class="logo__text">
                        Logo
                    </div>                
                </div>
            </div>
            <div class="column column_right">
                <div class="userMenu">
                    <font-awesome-icon :icon="cog" class="userMenu__icon" />
                    <font-awesome-icon :icon="bell" class="userMenu__icon" />
                    <font-awesome-icon :icon="signOut" class="userMenu__icon" />
                </div>
            </div>
        </div>
    </div>
    
</template>

<script lang="ts">

import { Vue } from 'vue-class-component'
import { faSpa, faBell, faCog, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons'

export default class NavigationComponent extends Vue {
    private className = "NavigationComponent"
    private spa: IconDefinition = faSpa
    private bell: IconDefinition = faBell
    private cog: IconDefinition = faCog
    private signOut: IconDefinition = faSignOutAlt
}
</script>

<style lang="scss" scoped>
$height: 50px;

.NavigationComponent {
    height: $height;
    background: $gray;
}
.content {
    display: flex;
    align-items: center;
}
.column_right {
    margin-left: auto;
}
.logo{
    display: flex;
    align-items: center;
    height: $height;
    &__icon {
        margin-right: 10px;
        font-size: $fontSize30;
    }
    &__text {
        text-transform: uppercase;
        font-size: $fontSize30;
    }
}
.userMenu {
    display: flex;
    align-items: center;
    font-size: $base-font-size;
    &__icon {
        margin-left: 20px;
    }
}
</style>
