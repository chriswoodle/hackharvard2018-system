<template>
    <div>
        <div class='uk-container small-section '>
<vk-card>
  <img src="images/full-logo.png">
  <div >
  <router-link :to="{name: 'dashboard'}">
        <vk-button class='uk-align-center'  type="primary">Enter</vk-button>
</router-link>
        </div>

</vk-card>
   
        </div>
    </div>
</template>

<script lang="ts">

console.log("init");

import { host } from "./host";

import Vue from "vue";

export default Vue.extend({
  data: function(this: any) {
    return {
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
