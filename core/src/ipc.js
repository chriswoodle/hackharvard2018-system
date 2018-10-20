const redis = require("redis");
const log = require('debug')('core:ipc');

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.RESID_PORT,
    password: process.env.REDIS_PASS
});

client.on("error", (err) => {
    log("Error " + err);
});

client.on("connect", () => {
    log('redis connected');
});

client.on("reconnecting", () => {
    log('redis reconnecting...');
});

module.exports = {
    client
};