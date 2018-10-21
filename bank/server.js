require('dotenv').config()

const average_yearly_vehicle_insurance = 800; // usd
const xrp_exchange_rate = .461836; // usd per XRP
const unit_exchange_rate = 100000; // units per xrp
const minutes_per_year = 525600;

const units_per_minute = Math.floor((average_yearly_vehicle_insurance / minutes_per_year) * (1 / xrp_exchange_rate) * unit_exchange_rate);
console.log('units_per_minute', units_per_minute);

//  dollars   xrp       units
//  ------- x ------- x ----
//  minute    dollars   xrp

const units_per_digest = Math.floor((units_per_minute / 60) * (process.env.DIGEST_INTERVAL / 1000));
console.log('units_per_digest', units_per_digest);

const crypto = require('crypto');

const makePlugin = require('ilp-plugin');
const { Server } = require('ilp-protocol-stream');
const PSK2 = require('ilp-protocol-psk2');

const log = require('debug')('bank:server');

const Koa = require('koa');
const app = new Koa();

const { client } = require('./src/ipc');

setTimeout(() => {
    client.set('units_per_minute', units_per_minute);
    client.set('units_per_digest', units_per_digest);
    // client.set('vehicle_balance', 0);

}, 1000)


const port = process.env.PORT || 8080;

async function run() {
    log('connecting...')
    const pskPlugin = makePlugin()
    const streamPlugin = makePlugin()

    await streamPlugin.connect()
    await pskPlugin.connect()

    const streamServer = new Server({
        plugin: streamPlugin,
        serverSecret: crypto.randomBytes(32)
    })

    streamServer.on('connection', connection => {
        log('connection.');
        connection.on('stream', stream => {
            stream.setReceiveMax(10000000000000)
            stream.on('money', amount => {
                log('got packet for', amount, 'units');
                amount = parseInt(amount);

                client.get('vehicle_balance', (err, balance) => {
                    if (err) return log(err);
                    balance = parseInt(balance);
                    const newBalance = balance + amount;
                    console.log(newBalance, balance, amount)
                    if (balance == null) {
                        client.set('vehicle_balance', 0);
                    }
                    if (balance != null) {
                        client.set('vehicle_balance', newBalance);
                    }
                });
            });

        });
    });

    await streamServer.listen();

    // PSK2 is included for backwards compatibility
    const pskReceiver = await PSK2.createReceiver({
        plugin: pskPlugin,
        paymentHandler: async params => {
            log('got packet for', params.prepare.amount, 'units')
            return params.acceptSingleChunk()
        }
    })

    log('created receiver...')
    async function handleSPSP(ctx, next) {
        if (ctx.get('Accept').indexOf('application/spsp4+json') !== -1) {
            const details = streamServer.generateAddressAndSecret();
            ctx.body = {
                destination_account: details.destinationAccount,
                shared_secret: details.sharedSecret.toString('base64')
            }
            ctx.set('Content-Type', 'application/spsp4+json');
            ctx.set('Access-Control-Allow-Origin', '*');
        } else if (ctx.get('Accept').indexOf('application/spsp+json') !== -1) {
            const details = pskReceiver.generateAddressAndSecret();
            ctx.body = {
                destination_account: details.destinationAccount,
                shared_secret: details.sharedSecret.toString('base64')
            }
            ctx.set('Content-Type', 'application/spsp+json');
            ctx.set('Access-Control-Allow-Origin', '*');
        } else {
            return next();
        }
    }

    app.use(handleSPSP);
    app.listen(port);

    log('listening on ' + port)

}

run()
    .catch(e => {
        console.error(e);
        process.exit(1);
    });

module.exports = {
    port
}