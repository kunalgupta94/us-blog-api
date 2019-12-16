const mongo = require("../server");
const { ObjectId } = require("mongodb");
const _ = require("../helper");
const { batch, user } = require("../constants").collections;
const batchCollection = mongo.db().collection(batch);
const userCollection = mongo.db().collection(user);

const getBatch = id =>
    new Promise((resolve, reject) =>
        batchCollection
            .findOne({ _id: new ObjectId(id) })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    );

const getBatchByUser = userId =>
    new Promise((resolve, reject) =>
        batchCollection
            .find({ createdBy: new ObjectId(userId) })
            .toArray((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
    );

const queryBatches = () =>
    new Promise((resolve, reject) =>
        batchCollection.find().toArray((err, res) => {
            if (err) {
                reject(err);
            }
            resolve(
                res.map(batch => {
                    return {
                        ...batch,
                        _id: batch._id.toString()
                    };
                })
            );
        })
    );

const createBatch = async (args, userId) => {
    const date = new Date().toISOString();
    return new Promise((resolve, reject) =>
        batchCollection.insertOne(
            {
                name: args.input.name,
                description: args.input.description,
                createdAt: date,
                createdBy: new ObjectId(userId)
            },
            (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data.result.ok === 1) {
                    resolve(data.ops[0]);
                }
            }
        )
    );
};

module.exports = {
    batchCollection,
    queryBatches,
    createBatch,
    getBatch,
    getBatchByUser
};
