const { Model } = require("../server");
const { article } = require("../constants").collections;
const { schema } = require("../imports").schema;

const articleSchema = {
    title: schema.String,
    body: schema.String,
    createdAt: schema.String,
    createdBy: schema.String,
    batch: schema.String
};

const createArticle = async (args, userid, batch) => {
    try {
        const date = new Date().toISOString();
        const data = await model.create({
            title: args.input.title,
            body: args.input.body,
            createdAt: date,
            createdBy: userid,
            batch: batch
        });
        return data;
    } catch (err) {
        throw err;
    }
};

const queryArticles = () =>
    new Promise((resolve, reject) =>
        model.find().toArray((err, res) => {
            if (err) {
                reject(err);
            }
            if (res.length === 0) return [];
            resolve(
                res.map(article => {
                    return {
                        ...article,
                        _id: article._id.toString()
                    };
                })
            );
        })
    );

const queryArticleById =  async id => {
    try {
        const data = model.findById(id);
        console.log(data)
        return data;
    } catch (err) {
        throw err;
    }
};

const model = new Model("Article", articleSchema, article);

module.exports = {
    createArticle,
    queryArticles,
    queryArticleById
};
