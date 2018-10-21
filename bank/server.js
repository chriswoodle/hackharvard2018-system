require('dotenv').config()
const crypto = require('crypto');

const makePlugin = require('ilp-plugin');
const { Server } = require('ilp-protocol-stream');
const PSK2 = require('ilp-protocol-psk2');

const log = require('debug')('bank:server');

const express = require('express');
const app = express();

const { client } = require('./src/ipc');

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
                client.get('vehicle_balance', (err, balance) => {
                    if (err) return log(err);
                    if (balance == null) {
                        client.set('vehicle_balance', 0);
                    }
                    if (balance != null) {
                        client.set('vehicle_rate', balance + amount);
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
