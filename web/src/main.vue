<template>
    <div>
        Main
        <router-view :key="$route.fullPath">
        </router-view>
    </div>
</template>

<script lang="ts">
import { router } from "./index";

import { Vue, Component } from "vue-property-decorator";

@Component
export default class Main extends Vue {
  protected methods = {};
}
</script>

<style lang="scss" scoped>
</style>
