const {
    queryBatches,
    createBatch,
    getBatch,
    getBatchByUser
} = require("../models/batch.model");
const { createUser, loginQuery } = require("../models/user.model");
const { createArticle, queryArticles, queryArticleById } = require("../models/article.model");

module.exports = {
    batch: async args => {
        try {
            const data = await getBatch(args._id);
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
    article: async (args) => {
        try {
            const data = await queryArticleById(args._id);
            return data;
        } catch (err) {
            throw err;
        }
    },
    articles: async () => {
        try {
            const data = await queryArticles();
            console.log(data)
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
    createArticle: async (args, req) => {
        try {
            if (req.isAuth) {
                const mutation = await createArticle(
                    args,
                    req.userId,
                    args.input.batch
                );
                return mutation;
            }
            throw new Error("Authentication Error");
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
