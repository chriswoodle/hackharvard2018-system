
const base_insurance_rate = 2; // XRP per DIGEST_INTERVAL
const log = require('debug')('core:digest');

const { client } = require('./ipc');

const { db } = require('./database');

let interval;

function digest() {
    log('digest...');
    client.get('vehicle_rate', (err, vehicle_rate) => {
        if (err) return log(err);
        console.log(vehicle_rate)
        vehicle_rate = parseFloat(vehicle_rate);
        if (vehicle_rate == null || vehicle_rate == 0) {
            client.set('vehicle_rate', 1);
        }

        client.get('vehicle_balance', (err, balance) => {
            balance = parseInt(balance);
            client.get('units_per_digest', (err, units_per_digest) => {
                units_per_digest = parseInt(units_per_digest);
                console.log(balance, units_per_digest, vehicle_rate)
                client.set('vehicle_balance', balance + Math.floor(units_per_digest * vehicle_rate));
            });
        });
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