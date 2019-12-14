const mongo = require("../server");
const { user } = require("../constants").collections;

const db = mongo.db();
const userCollection = db.collection(user);

const createUser = args => {
    return new Promise((resolve, reject) =>
        userCollection.insertOne(
            {
                email: args.input.email,
                password: args.input.password
            },
            (err, result) => {
                if (err) {
                    reject(err);
                }
                console.log(result);
                if (result.result.ok === 1) {
                    resolve(result.ops[0]);
                }
            }
        )
    );
};

module.exports = {
    userCollection,
    createUser
};
