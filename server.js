const dbUrl = `${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const MongoClient = require('mongodb').MongoClient;

let _db;

const connectDB = async (callback) => {
    try {
        MongoClient.connect(
            dbUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (err, client) => {
                _db = client.db(process.env.DB_NAME);
                return callback(err);
            }
        )
    }
    catch(err) {
        throw err;
    }
}

module.exports = {
    connect: connectDB,
    db: () => _db,
}