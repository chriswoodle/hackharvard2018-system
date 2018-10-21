let speed = require('./speedData.js');

// console.log("Free Speed: "+speed.getAzureMapsFreeSpeed(42.368904, -71.063568));
// console.log("Current Speed: "+speed.getAzureMapsCurrentSpeed(42.368904, -71.063568));

speed.getAzureMapsFreeSpeed(42.368904, -71.063568)
.then(speed => {
    console.log("Free Speed: "+speed+" MPH");
});

speed.getAzureMapsCurrentSpeed(42.368904, -71.063568)
.then(speed => {
    console.log("Current Speed: "+speed+" MPH");
});

speed.getHERESpeedCode(42.368904, -71.063568)
.then(speed => {
    console.log("Current HERE Speed Category: "+speed);
});
