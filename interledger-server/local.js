const server = require('./server');
const localtunnel = require('localtunnel');
const chalk = require('chalk');
const subdomain = process.env.SUBDOMAIN || 'woodle';
localtunnel(server.port, { subdomain: subdomain }, (err, tunnel) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(chalk.green('public at:', tunnel.url));
    console.log(chalk.green('payment pointer is:', '$' + subdomain + '.localtunnel.me'));
});