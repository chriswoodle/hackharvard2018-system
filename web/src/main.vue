<template>
    <div>
        <vk-navbar>

  <vk-navbar-nav>
    <vk-navbar-nav-item title="Insura-ledger" active></vk-navbar-nav-item>
  </vk-navbar-nav>

  <vk-navbar-nav slot="right">
    <vk-navbar-nav-item title="Utilities" href='/util'></vk-navbar-nav-item>
    <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
  </vk-navbar-nav>

        </vk-navbar>
        <div class='uk-section uk-section-default'>
            <router-view :key="$route.fullPath">
            </router-view>
        </div>

    </div>
</template>

<script lang="ts">
import { router } from "./index";
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
$global-link-color: #3b86ff;
.uk-navbar {
  background-color: $global-link-color;
  color: white;
}
.uk-navbar-nav > li.uk-active > a {
  color: white;
}
.uk-navbar-nav > li > a {
  color: #e2e2e2;
}
</style>
