const path = require('path');

const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.get('/status', (req, res) => res.send('Hello world'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
app.use('/dist', express.static(path.join(__dirname, './dist')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
