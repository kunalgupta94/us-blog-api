const {
    queryBatches,
    createBatch,
    getBatch,
    getBatchByUser
} = require("../models/batch.model");
const { createUser, loginQuery } = require("../models/user.model");

module.exports = {
    batch: async args => {
        try {
            let data;
            if (args._id && args.userId) {
                throw new Error("Please enter either userId or Batch Id");
            }
            if (args._id) {
                data = await getBatch(args._id);
                data = [data]
            } else if (args.userId) {
                data = await getBatchByUser(args.userId);
            }
            return data;
        } catch (err) {
            throw err;
        }
    },
    batches: async () => {
        try {
            const data = await queryBatches();
            return data;
        } catch (err) {
            throw err;
        }
    },
    createBatch: async (args, req) => {
        try {
            if (req.isAuth) {
                const mutation = await createBatch(args, req.userId);
                return mutation;
            }
            throw new Error("Authentication Error");
        } catch (err) {
            throw err;
        }
    },
    createUser: async args => {
        try {
            const mutation = await createUser(args);
            return mutation;
        } catch (err) {
            throw err;
        }
    },
    loginQuery: async args => {
        try {
            const query = await loginQuery(args);
            return query;
        } catch (err) {
            throw err;
        }
    }
};
