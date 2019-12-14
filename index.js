const express = require('express'),
    bodyParser = require('body-parser'),
    graphQlHttp = require('express-graphql'),
    mongo = require('./server');

mongo.connect((err) => {
    console.clear()
    if (err) {
        console.log(err);
        process.exit(0);
    }
    console.log("Connected to database: ", process.env.DB_NAME)
    const Resolvers = require('./graphql/Resolvers');
    const Schema = require('./graphql/Schema');
    const app = express();
    app.use(bodyParser.json());
    app.use('/', graphQlHttp({
        schema: Schema,
        rootValue: Resolvers,
        graphiql: true,
    }))
    app.listen(
        process.env.PORT,
        () => console.log("App listening at ", process.env.PORT)
    )
});
