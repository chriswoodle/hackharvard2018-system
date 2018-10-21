<template>
    <div>
        <div class='uk-container'>
        <h1>Dashboard</h1>
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

socket.on("message", message => {
//   console.log(message);
  const type = message.split(":")[0];
  const body = message.split(":")[1];
  switch (type) {
    case "vehicle_rate":
      console.log("Vehicle rate is", body);
      break;
  }
});

import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
</style>
