const dbUrl = `${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");

const errors = {
    invalidArgs: schemaName =>
        new Error(`Invalid args provided in schema ${schemaName}`),
    invalidType: (type, key) => new Error(`Expected type ${type} for ${key}`)
};

let _db;

class Model {
    constructor(name, schema, collection) {
        this.name = name;
        this.schema = schema;
        this.collection = _db.collection(collection);
    }

    create(args) {
        const argKeys = Object.keys(args);
        const schemaKeys = Object.keys(this.schema);
        const { invalidArgs, invalidType } = errors;
        const schemaName = this.name.toLowerCase();
        const model = {};

        assert.deepStrictEqual(argKeys, schemaKeys, invalidArgs(schemaName));
        for (let i = 0; i < argKeys.length; i++) {
            try {
                const key = argKeys[i];
                const arg = args[key];
                const type = this.schema[key];
                assert.strictEqual(typeof arg, type, invalidType(type, key));
                model[key] = arg;
            } catch (err) {
                throw err;
            }
        }
        return this.collection.insertOne(model).then(res => res.ops[0]);
    }

    findById(id) {
        const { invalidType } = errors;
        assert.strictEqual(typeof id, "string", invalidType("string", "id"));
        return this.collection
            .findOne({ _id: new ObjectId(id) })
            .then(res => res);
    }

    find() {
        // const argKeys = Object.keys(args);
        // const schemaKeys = Object.keys(this.schema);
        return this.collection.find()
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
