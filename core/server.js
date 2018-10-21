require('dotenv').config()
const log = require('debug')('core:server');

// console.log(process.env);
const { client } = require('./src/ipc');

const digest = require('./src/digest');

const express = require('express');
const app = express();

const { db } = require('./src/database');

const map = require('./src/speedData');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));


// Smart Car OAuth
const smartCarLog = require('debug')('core:smartcar');
const smartcar = require('smartcar');
const smartcarclient = new smartcar.AuthClient({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URL,
    scope: ['read_vehicle_info control_security control_security:unlock control_security:lock read_location'],
    testMode: false, // launch the Smartcar auth flow in test mode
});

// Redirect to Smartcar's authentication flow
app.get('/login', (req, res) => {
    smartCarLog('redirecting to smartcar oauth...');
    const link = smartcarclient.getAuthUrl({ state: 'MY_STATE_PARAM' });
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
    return smartcarclient.exchangeCode(req.query.code)
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/balance', (req, res) => {
    client.get('vehicle_balance', (err, balance) => {
        if (err) return log(err);
        if (balance == null) {
            client.set('vehicle_balance', 0);
        }
        res.json({ balance: parseInt(balance) });
    });
});

app.post('/startDigest', (req, res) => {
    digest.startDigest();
    res.send('Started');
});

app.post('/stopDigest', (req, res) => {
    digest.stopDigest();
    res.send('stopped');
});

app.get('/computeVehiclePremium', (req, res) => {
    client.get('vehicle_rate', (err, rate) => {
        if (err) return log(err);
        // console.log(rate);
        client.get('vehicle_location', (err, location) => {
            if (err) return log(err);
            const lat = parseFloat(location.split(',')[0]);
            const long = parseFloat(location.split(',')[1]);
            client.get('vehicle_speed', (err, speed) => {
                if (err) return log(err);
                speed = parseFloat(speed);

                console.log(lat, long, speed)
                Promise.all([
                    map.getAzureMapsCurrentSpeed(lat, long),
                    map.getAzureMapsFreeSpeed(lat, long),
                    map.getHERESpeedCode(lat, long)
                ]).then((responses) => {
                    console.log(responses)
                    const currentSpeed = responses[0];
                    const freeSpeed = responses[1]; // Speed with no traffic (usually speed limit + little more)
                    const speedCode = responses[2];
                    let speedScore = .95;
                    if (speed > freeSpeed + 5)
                        speedScore = speedScore + (speed - (freeSpeed + 5)) / 20;

                    if (speed > currentSpeed + 5)
                        speedScore = speedScore + (speed - (currentSpeed + 5)) / 20;

                    if (speed < freeSpeed - 5)
                        speedScore = speedScore + ((freeSpeed - 5) - speed) / 20;

                    if (speed < currentSpeed - 5)
                        speedScore = speedScore + ((currentSpeed - 5) - speed) / 20;

                    client.set('vehicle_rate', speedScore);

                    res.json({
                        vehicle_speed: speed,
                        currentSpeed,
                        freeSpeed,
                        speedCode,
                        speedScore
                    });
                }).catch(err => {
                    console.log(err)
                })
            });
        });
    });

});

const ioLog = require('debug')('core:socket.io');

io.on('connection', function (socket) {
    ioLog('connected');
    const interval = setInterval(() => {
        client.get('vehicle_rate', (err, rate) => {
            if (err) return log(err);
            // console.log(rate);
            if (socket.connected)
                socket.send(`vehicle_rate:${rate}`);
        });
        client.get('vehicle_speed', (err, rate) => {
            if (err) return log(err);
            // console.log(rate);
            if (socket.connected)
                socket.send(`vehicle_speed:${rate}`);
        });
        client.get('vehicle_balance', (err, balance) => {
            if (err) return log(err);
            // console.log(rate);
            if (socket.connected)
                socket.send(`vehicle_balance:${balance}`);
        });
    }, 1000);

    socket.on('disconnect', () => {
        ioLog('disconnected');
        clearInterval(interval)
    });
});

http.listen(port, () => log(`App listening on port ${port}!`));