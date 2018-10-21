<template>
    <div>
        <div class='uk-container'>
          <vk-grid gutter="small" matched class="uk-child-width-1-3@m">
             <div>
          <vk-card>
            <vk-card-title>Balance</vk-card-title>
            <vk-label>{{balance}} XRP</vk-label>
          </vk-card>
          </div>
             <div>

          <vk-card>
            <vk-card-title>Rate</vk-card-title>
            <vk-label>{{rate}} XRP/Time</vk-label>
          </vk-card>
          </div>

          </vk-grid>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import io from "socket.io-client";

const socket = io("http://localhost:3000");

console.log("init");

socket.on("connect", onConnect);

function onConnect() {
  console.log("connect " + socket.id);
}

import { host } from "./host";

import Vue from "vue";

export default Vue.extend({
  data: function(this: any) {
    // Subscribe to changes
    socket.on("message", message => {
      //   console.log(message);
      const type = message.split(":")[0];
      const body = message.split(":")[1];
      switch (type) {
        case "vehicle_rate":
          console.log("Vehicle rate is", body);
          this.rate = body;
          break;
        case "vehicle_speed":
          console.log("Vehicle speed is", body);
          break;
      }
    });

    // Get balance
    this.axios.get(`${host}/balance`).then(response => {
      console.log(response.data);
      this.balance = response.data.balance;
    });
    return {
      rate: "--",
      balance: "--"
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
