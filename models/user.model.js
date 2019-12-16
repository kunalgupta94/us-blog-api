const mongo = require("../server");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const _ = require("../helper");
const { user } = require("../constants").collections;
const userCollection = mongo.db().collection(user);
const { getBatchByUser } = require("./batch.model");

const loginQuery = args => {
    return new Promise((resolve, reject) =>
        userCollection.findOne({ email: args.input.email }, (err, result) => {
            if (result) {
                const hash = crypto
                    .pbkdf2Sync(
                        args.input.password,
                        result.salt,
                        1000,
                        64,
                        "sha512"
                    )
                    .toString("hex");
                try {
                    if (hash === result.password) {
                        const token = jwt.sign(
                            { email: result.email, _id: result._id },
                            process.env.SECRET_KEY
                        );
                        resolve({ token });
                    }
                } catch (err) {
                    reject(err);
                }
            }
            reject(err);
        })
    );
};

const getUser = id => {
    return new Promise((resolve, reject) =>
        userCollection
            .findOne({ _id: new ObjectId(id) })
            .then(res => {
                getBatchByUser(id).then(batches => {
                    resolve({ email: res.email, batches, _id: res._id });
                });
            })
            .catch(err => {
                throw err;
            })
    );
};

const createUser = async args => {
    try {
        const user = await userCollection.findOne({ email: args.input.email });
        if (user) {
            throw new Error("User already eists");
        }
    } catch (err) {
        throw err;
    }
    const passwordData = _.setPassword(args.input.password);
    return new Promise((resolve, reject) =>
        userCollection.insertOne(
            {
                email: args.input.email,
                password: passwordData.hash,
                salt: passwordData.salt
            },
            (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result.result.ok === 1) {
                    const { email, _id } = result.ops[0];
                    const token = jwt.sign(
                        { email, _id },
                        process.env.SECRET_KEY
                    );
                    resolve({ token });
                }
            }
        )
    );
};

module.exports = {
    userCollection,
    createUser,
    loginQuery,
    getUser
};
