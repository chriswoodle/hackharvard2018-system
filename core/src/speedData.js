const axios = require('axios');

// Returns speedCategory as described here: https://developer.here.com/documentation/geocoder/topics/resource-type-speed-category.html
function getHERESpeedCode(lat, long) {

    return new Promise((resolve, reject) => {
        axios.get('https://reverse.geocoder.api.here.com/6.2/reversegeocode.json', {
            params: {
                app_id: process.env.HERE_APP_ID,
                app_code: creds.HERE_APP_CODE,
                mode: "retrieveAddresses",
                locationattributes: "li",
                prox: lat + ", " + long
            }
        })
            .then(response => {
                //console.log(response.data.Response.View[0].Result[0].Location.LinkInfo.SpeedCategory); //.LinkInfo.SpeedLimit
                resolve(response.data.Response.View[0].Result[0].Location.LinkInfo.SpeedCategory);
            })
            .catch(function (error) {
                //console.log(error);
                reject(error);
            });
    });

}

// Returns the current traffic flow speed
function getAzureMapsCurrentSpeed(lat, long) {

    return new Promise((resolve, reject) => {

        axios.get('https://atlas.microsoft.com/traffic/flow/segment/json',
            {
                params: {
                    "subscription-key": process.env.AZURE_MAPS_KEY,
                    "api-version": "1.0",
                    "style": "absolute",
                    "zoom": "10",
                    "query": lat + "," + long,
                    "unit": "MPH"
                }
            })
            .then(response => {
                //console.log(response.data.flowSegmentData.currentSpeed);
                resolve(response.data.flowSegmentData.currentSpeed);
            })
            .catch(error => {
                //console.log(error.response.data);
                reject(error.response.data);
            });
    });
}

// Returns the typical free speed of the given road via coordinates
function getAzureMapsFreeSpeed(lat, long) {

    return new Promise((resolve, reject) => {

        axios.get('https://atlas.microsoft.com/traffic/flow/segment/json',
            {
                params: {
                    "subscription-key": process.env.AZURE_MAPS_KEY,
                    "api-version": "1.0",
                    "style": "absolute",
                    "zoom": "10",
                    "query": lat + "," + long,
                    "unit": "MPH"
                }
            })
            .then(response => {
                //console.log(response.data.flowSegmentData.freeFlowSpeed);
                resolve(response.data.flowSegmentData.freeFlowSpeed);
            })
            .catch(error => {
                //console.log(error.response.data);
                reject(error.response.data);
            });

    });
}

module.exports = {
    getHERESpeedCode : getHERESpeedCode,
    getAzureMapsCurrentSpeed : getAzureMapsCurrentSpeed,
    getAzureMapsFreeSpeed : getAzureMapsFreeSpeed
}
