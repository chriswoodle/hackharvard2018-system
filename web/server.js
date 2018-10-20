const log = require('debug')('core:server');

// console.log(process.env);
const ipc = require('./src/ipc');

const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.get('/status', (req, res) => res.send('Hello world'));

app.get('/', (req, res) => res.sendFile('./index.html'));
app.use('/dist', express.static(path.join(__dirname, './dist')))