
const location = {
    "latitude": 42.38067626953125,
    "longitude": -71.12454986572266
};

// const location = {
//     "latitude": 42.38067626953125,
//     "longitude": -71.12454986572266
// };

require('dotenv').config()

const redis = require('redis');

const options = {
    host: process.env.REDIS_HOST,
    port: process.env.RESID_PORT,
    password: process.env.REDIS_PASS
};

const client = redis.createClient(options);

client.on('error', (err) => {
    console.log('Error ' + err);
});

client.on('connect', () => {
    console.log('redis connected');
    client.set('vehicle_location', `${location.latitude},${location.longitude}`);
    console.log('set location')
    client.quit();
});

client.on('reconnecting', () => {
    console.log('redis reconnecting...');
});
