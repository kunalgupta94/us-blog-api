const { queryBatches, createBatch } = require("../models/batch.model");
const { createUser, loginQuery } = require("../models/user.model");

module.exports = {
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
            throw new Error('Authentication Error')
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
    },
};
