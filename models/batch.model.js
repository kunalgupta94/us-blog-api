const mongo = require('../server');
const _ = require("../helper");

const db = mongo.db();

function Batch() {
    try {
        this.collection = db.collection('batch');
        if (!this.collection) {
            db.createCollection('batch', (err, result) => {
                if (err) {
                    throw err
                    process.exit(0);
                }
                this.collection = result;
                console.log('collection created')
            })
        }
    } catch (err) {
        throw err
    }
}

Batch.prototype.queryAll = function () {
    return new Promise((resolve, reject) => this.collection.find().toArray((err, res) => {
        if (err) {
            reject(err)
        }
        resolve(res.map(batch => {
            return { ...batch, _id: batch._id.toString(), createdBy: "Kunal" };
        }))
    }))
}

Batch.prototype.createBatch = function (args) {
    const date = new Date().toISOString();
    const user = "Kunal"
    return new Promise((resolve, reject) => this.collection.insertOne({
        name: args.input.name,
        description: args.input.description,
        createdAt: date,
        createdBy: user,
    }, (err, data) => {
        if (err) {
            reject(err)
        }
        console.log(data)
        if (data.result.ok === 1) {
            resolve(data.ops[0])
        }
    }))
}

module.exports = Batch;
