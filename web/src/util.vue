<template>
    <div>
        <div class='uk-container'>
        <h1>Utilities</h1>
        <vk-button type="primary" @click="startDigest()">Start Digest</vk-button>
        <vk-button type="secondary" @click="stopDigest()">Stop Digest</vk-button>
    </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import { host } from "./host";

export default Vue.extend({
  methods: {
    startDigest: function(this: Vue) {
      this.axios.post(`${host}/startDigest`).then(response => {
        console.log(response.data);
      });
    },
    stopDigest: function(this: Vue) {
      this.axios.post(`${host}/stopDigest`).then(response => {
        console.log(response.data);
      });
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
