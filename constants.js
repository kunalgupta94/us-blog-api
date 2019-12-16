module.exports = {
    collections: {
        batch: "batch",
        user: "user",
        article: "article",
    },
    messages: {
        server: `App is listening on port: ${process.env.PORT}`,
        database: `Database ${process.env.DB_NAME} is connected`
    }
};
