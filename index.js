const { express, bodyParser, graphQlHttp } = require("./imports");
const mongo = require("./server");
const { messages } = require("./constants");
const authentication = require('./middleware');
mongo.connect(err => {
    console.clear();
    if (err) {
        console.log(err);
        process.exit(0);
    }
    console.log("======================================");
    console.log(messages.database);
    const Resolvers = require("./graphql/Resolvers");
    const Schema = require("./graphql/Schema");
    const app = express();
    app.use(bodyParser.json());
    app.use(authentication);
    app.use(
        "/",
        graphQlHttp({
            schema: Schema,
            rootValue: Resolvers,
            graphiql: true
        })
    );
    app.listen(process.env.PORT, () =>
        console.log(
            messages.server,
            "\n======================================="
        )
    );
});
