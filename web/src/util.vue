<template>
    <div>
        <div class='uk-container'>
      <vk-card>

        <h1>Utilities</h1>
        <vk-button type="primary" @click="startDigest()">Start Digest</vk-button>
        <vk-button type="secondary" @click="stopDigest()">Stop Digest</vk-button>
        <vk-button @click="calcRate()">Rate Vehicle</vk-button>
      </vk-card>

    </div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";

import { host } from "./host";

export default Vue.extend({
  methods: {
    calcRate: function(this: Vue) {
      this.axios.get(`${host}/computeVehiclePremium`).then(response => {
        console.log(response.data);
      });
    },
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
