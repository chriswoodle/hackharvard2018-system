
const base_insurance_rate = 2; // XRP per DIGEST_INTERVAL
const log = require('debug')('core:digest');

const { client } = require('./ipc');

const { db } = require('./database');

let interval;

function digest() {
    log('digest...');
    client.get('vehicle_rate', (err, value) => {
        if (err) return log(err);
        if(value == null){
            client.set('vehicle_rate', 1);
        }
    });
}

function startDigest() {
    interval = setInterval(digest, process.env.DIGEST_INTERVAL ? parseInt(process.env.DIGEST_INTERVAL) : 5000);
}

function stopDigest() {
    clearInterval(interval);
}

module.exports = {
    startDigest,
    stopDigest
}