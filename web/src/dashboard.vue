<template>
    <div>
        <div class='uk-container small-section'>
<vk-card >
  <div slot="header">
    <vk-grid gutter="small" class="uk-flex-middle">
      <div class="uk-width-auto">
        <img class="uk-border-circle" width="80" height="80"  src="images/models.png">
      </div>
      <div class="uk-width-expand">
        <vk-card-title class="uk-margin-remove-bottom">Tesla Model S</vk-card-title>
        <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">Sunday, October 21, 2018</time></p>
      </div>
    </vk-grid>
  </div>
</vk-card>
    </div>

        <div class='uk-container'>
      
          <vk-grid gutter="small" matched class="uk-child-width-1-3@m">
             <div>
          <vk-card>
            <vk-card-title>Balance</vk-card-title>
            <p>Streamed balance</p>
            <vk-label>{{Math.round((balance / 100000) * 100) / 100 }} XRP</vk-label>
            <vk-label type="success">{{
              Math.round(((balance / 100000) * .461836) * 100) / 100}} USD</vk-label>

          </vk-card>
          </div>
             <div>

          <vk-card>
            <vk-card-title>Insurance Score</vk-card-title>
            <p>Lower is better</p>
            <vk-label>{{Math.round(rate * 100)}}</vk-label>
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
          // console.log("Vehicle rate is", body);
          this.rate = body;
          break;
        case "vehicle_speed":
          // console.log("Vehicle speed is", body);
          break;
        case "vehicle_balance":
          this.balance = body;
          console.log((this.balance / 100000) * 0.461836);
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
.small-section {
  margin-bottom: 10px;
}
.car {
  height: 80px;
  width: 80px;
}
</style>
