const mongodb = require('mongodb');

const log = require('debug')('core:database');

if (!process.env.MONGODB_CONN_STRING) {
    console.warn('missing process.env.MONGODB_CONN_STRING!');
    process.exit(1);
}

class Database {
    constructor(connectionString) {
        mongodb.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
            if (err) throw new Error(err.message);
            this.db = client.db();
        });
    }

    log(action) {
        return new Promise((resolve, reject) => {
            if (!this.db) throw new Error('Database not initilized!');
            action.created = Date.now().toISOString();
            this.db.collection('logs').insert(action).then(result => {
                if (!result) {
                    debug('could not insert');
                }
                return resolve(null);
            });
        });
    }
}

const db = new Database(process.env.MONGODB_CONN_STRING);

module.exports = {
    db
}