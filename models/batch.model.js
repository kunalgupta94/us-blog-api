const mongo = require("../server");
const _ = require("../helper");
const { batch } = require("../constants").collections;

const db = mongo.db();
const batchCollection = db.collection(batch);

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
                        _id: batch._id.toString(),
                        createdBy: "Kunal"
                    };
                })
            );
        })
    );

const createBatch = args => {
    const date = new Date().toISOString();
    const user = "Kunal";
    return new Promise((resolve, reject) =>
        batchCollection.insertOne(
            {
                name: args.input.name,
                description: args.input.description,
                createdAt: date,
                createdBy: user
            },
            (err, data) => {
                if (err) {
                    reject(err);
                }
                console.log(data);
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
    createBatch
};
