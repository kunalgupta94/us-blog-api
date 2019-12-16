const { Model } = require("../server");
const { ObjectId } = require("mongodb");
const _ = require("../helper");
const { batch } = require("../constants").collections;
const { schema } = require("../imports").schema;

const batchSchema = {
    name: schema.String,
    description: schema.String,
    createdAt: schema.String,
    createdBy: schema.String
};

const getBatch = async id => {
    try {
        const data = model.findById(id);
        console.log(data)
        return data;
    } catch (err) {
        throw err;
    }
};

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
    try {
        const date = new Date().toISOString();
        const data = await model.create({
            name: args.input.name,
            description: args.input.description,
            createdAt: date,
            createdBy: userId
        });
        return data;
    } catch (err) {
        throw err;
    }
};

const model = new Model("Batch", batchSchema, batch);

module.exports = {
    queryBatches,
    createBatch,
    getBatch,
    getBatchByUser
};
