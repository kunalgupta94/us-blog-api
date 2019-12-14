const mongo = require("../server");
const _ = require("../helper");
const { user } = require("../constants").collections;
const db = mongo.db();
const userCollection = db.collection(user);

const loginQuery = args => {
    return new Promise((resolve, reject) =>
        userCollection.findOne({ email: args.input.email }, (err, result) => {
            if (result) {
                resolve(
                    _.validatePassword(
                        args.input.password,
                        result.salt,
                        result.password
                    )
                );
            }
            reject(err);
        })
    );
};

const createUser = async args => {
    const user = await userCollection.findOne({ email: args.input.email });
    if (user) {
        throw new Error("User already eists");
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
                    const { salt, password, ...data } = result.ops[0];
                    resolve({ ...data });
                }
            }
        )
    );
};

module.exports = {
    userCollection,
    createUser,
    loginQuery
};
