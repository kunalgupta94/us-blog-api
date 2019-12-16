const dbUrl = `${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");

let _db;

class Model {
    constructor(name, schema, collection) {
        this.name = name;
        this.schema = schema;
        this.collection = _db.collection(collection);
    }

    create(args) {
        const argKeys = Object.keys(args);
        assert.deepStrictEqual(
            argKeys,
            Object.keys(this.schema),
            new Error(
                `Invalid args provided in schema ${this.name.toLowerCase()}`
            )
        );
        const model = {};
        for (let i = 0; i < argKeys.length; i++) {
            try {
                const key = argKeys[i];
                const arg = args[key];
                const schema = this.schema[key];
                if (typeof arg === schema) {
                    model[key] = arg;
                } else {
                    throw new Error(`Expected type ${schema} for ${key}`);
                }
            } catch (err) {
                throw err;
            }
        }
        return this.collection.insertOne(model).then(res => res.ops[0]);
    }

    findById(id) {
        assert(
            typeof id,
            "string",
            new Error(`Invalid type of Id in schema ${this.name.toLowerCase()}`)
        );
        this.collection
            .findOne({ _id: new ObjectId(id) })
            .then(res => res.ops[0]);
    }

    find(args) {
        const argKeys = Object.keys(args);
        const schemaKeys = Object.keys(this.schema);
        console.log(argKeys.forEach(key => schemaKeys.includes(key)));
    }
}

const connectDB = async callback => {
    try {
        MongoClient.connect(
            dbUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err, client) => {
                _db = client.db(process.env.DB_NAME);
                return callback(err);
            }
        );
    } catch (err) {
        throw err;
    }
};

module.exports = {
    connect: connectDB,
    db: () => _db,
    Model
};
