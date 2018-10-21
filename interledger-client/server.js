'use strict'

const ilp = require('ilp')
ilp.SPSP.pay(ilp.createPlugin(), {
    receiver: '$c0352923e5aad9b6.localtunnel.me',
    sourceAmount: '1000'
}).then(response => {
    console.log(response.sent);
})