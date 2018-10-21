const redis = require('redis');
const debug = require('debug');

const options = {
    host: process.env.REDIS_HOST,
    port: process.env.RESID_PORT,
    password: process.env.REDIS_PASS
};

const client = redis.createClient(options);

client.on('error', (err) => {
    debug('core:ipc-client')('Error ' + err);
});

client.on('connect', () => {
    debug('core:ipc-client')('redis connected');
});

client.on('reconnecting', () => {
    debug('core:ipc-client')('redis reconnecting...');
});

const subscribe = redis.createClient(options);
subscribe.on('error', (err) => {
    debug('core:ipc-subscribe')('Error ' + err);
});

const publish = redis.createClient(options);
publish.on('error', (err) => {
    debug('core:ipc-publish')('Error ' + err);
});

module.exports = {
    client,
    publish,
    subscribe
};