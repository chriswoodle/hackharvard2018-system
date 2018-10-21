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
          // console.log("Vehicle rate is", body);
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
      balance: "--",
      handler1: new Vue(),
      handler2: new Vue()
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

<style lang="scss">
@import "c3.css";
</style>
