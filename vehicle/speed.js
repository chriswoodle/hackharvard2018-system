const speed = 50;

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
    client.set('vehicle_speed', speed);
    console.log('set speed')
    client.quit();
});

client.on('reconnecting', () => {
    console.log('redis reconnecting...');
});
