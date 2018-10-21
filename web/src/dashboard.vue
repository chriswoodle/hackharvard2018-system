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
          <div>
            <br />
            <center><h3>Premium Score</h3></center>
            <br />
            <vue-c3 :handler="handler1"></vue-c3>
            <br />
            <center><h3>Speed of Vehicle</h3></center>
            <br />
            <vue-c3 :handler="handler2"></vue-c3>
            <br />
          </div>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import io from "socket.io-client";

import VueC3 from "vue-c3";

const socket = io("http://localhost:3000");

console.log("init");

socket.on("connect", onConnect);

function onConnect() {
  console.log("connect " + socket.id);
}

import { host } from "./host";

import Vue from "vue";

var arr1: any[] = [];
var arr2: any[] = [];
var xArr1: any[] = [];
var xArr2: any[] = [];

for (var i = 0; i < 100; i++) {
  arr1.push(0);
  arr2.push(0);
  xArr1.push(new Date().getTime());
  xArr2.push(new Date().getTime());
}
export default Vue.extend({
  components: {
    VueC3
  },
  mounted() {
    // to init the graph call:
    const options1 = {
      data: {
        x: "x",
        columns: [
          ["x"].concat(xArr1),
          ["Rate"].concat(arr1)
          //['data2'].concat(arr2)
        ],
        type: "spline"
        // colors: {
        //   data1: "#ff0000"
        // }
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: function(x) {
              return new Date(x).toTimeString();
            }
          }
        },
        y: {
          label: "Premium Score (%)"
        }
      },
      legend: {
        hide : true
      }
    };
    this.handler1.$emit("init", options1);
    const options2 = {
      data: {
        x: "x",
        columns: [
          ["x"].concat(xArr2),
          //["data1"].concat(arr1)
          ["Speed"].concat(arr2)
        ],
        type: "spline"
        // colors: {
        //   data1: "#ff0000"
        // }
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: function(x) {
              return new Date(x).toTimeString();
            }
          }
        },
        y: {
          label: "Speed of Vehicle (MPH)"
        }
      },
      legend: {
        hide : true
      }
    };
    this.handler2.$emit("init", options2);
  },
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
          this.handler1.$emit("dispatch", chart => {
            var newNumOne = Math.floor(Math.random() * 10);
            //var newNumTwo = Math.floor(Math.random()*10);

            arr1.push(parseFloat(this.rate) * 100);
            //arr2.push(newNumTwo);
            xArr1.push(new Date().getTime());
            arr1.shift();
            //arr2.shift();
            xArr1.shift();
            chart.load({
              x: "x",
              columns: [
                ["x"].concat(xArr1),
                ["Rate"].concat(arr1)
                //['data2'].concat(arr2)
              ]
            });
          });
          break;
        case "vehicle_speed":
          console.log("Vehicle speed is", body);
          this.handler2.$emit("dispatch", chart => {
            //var newNumOne = Math.floor(Math.random() * 10);
            var newNumTwo = Math.floor(Math.random() * 10);

            //arr1.push(newNumOne);
            arr2.push(parseInt(body));
            xArr2.push(new Date().getTime());
            //arr1.shift();
            arr2.shift();
            xArr2.shift();
            chart.load({
              x: "x",
              columns: [
                ["x"].concat(xArr2),
                //["data1"].concat(arr1)
                ["Speed"].concat(arr2)
              ]
            });
          });
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
      balance: "--",
      handler1: new Vue(),
      handler2: new Vue()
    };
  }
});
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
@import "c3.css";
</style>
