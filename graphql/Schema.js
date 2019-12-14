const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Batch {
    _id: ID!
    name: String!
    description: String!
    createdAt: String!
    createdBy: String!
    articles: [Article]
}

input BatchInput {
    name: String!
    description: String!
}

type Article {
    _id: ID!
    title: String!
    body: String!
    createdAt: String!
    createdBt: User!
    batch: Batch
}

input ArticleInput {
    title: String!
    body: String!
    batch: String
}

type User {
    _id: ID!
    email: String!
    password: String,
    salt: String
    batches: [Batch!]!
    articles: [Article!]!
}

input UserInput {
    email: String!
    password: String
}

type RootQuery {
    batches: [Batch!]!
    articles: [Article!]!
    loginQuery(input: UserInput): Boolean!
}

type RootMutation {
    createBatch(input: BatchInput): Batch
    createArticle(input: ArticleInput): Article
    createUser(input: UserInput): User
}

schema {
    query: RootQuery,
    mutation: RootMutation
}
`);
