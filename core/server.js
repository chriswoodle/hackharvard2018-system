require('dotenv').config()
const log = require('debug')('core:server');

// console.log(process.env);
const ipc = require('./src/ipc');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));


// Smart Car OAuth
const smartCarLog = require('debug')('core:smartcar');
const smartcar = require('smartcar');
const client = new smartcar.AuthClient({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URL,
    scope: ['read_vehicle_info control_security control_security:unlock control_security:lock read_location'],
    testMode: false, // launch the Smartcar auth flow in test mode
});

// Redirect to Smartcar's authentication flow
app.get('/login', (req, res) => {
    smartCarLog('redirecting to smartcar oauth...');
    const link = client.getAuthUrl({ state: 'MY_STATE_PARAM' });
    // redirect to the link
    res.redirect(link);
});

// Handle Smartcar callback with auth code
app.get('/callback', (req, res, next) => {
    let access;

    if (req.query.error) {
        // the user denied your requested permissions
        return next(new Error(req.query.error));
    }

    // exchange auth code for access token
    return client.exchangeCode(req.query.code)
        .then(function (_access) {
            // in a production app you'll want to store this in some kind of persistent storage
            access = _access;
            // get the user's vehicles
            smartCarLog(access.accessToken);

            return smartcar.getVehicleIds(access.accessToken);
        })
        .then(function (res) {
            // instantiate first vehicle in vehicle list
            const vehicle = new smartcar.Vehicle(res.vehicles[0], access.accessToken);
            // get identifying information about a vehicle
            return vehicle.info();
        })
        .then(function (data) {
            smartCarLog(data);

            // json response will be sent to the user
            res.json(data);
        });
});


// Demo API




app.listen(port, () => log(`Example app listening on port ${port}!`));