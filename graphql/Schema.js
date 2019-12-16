const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type AuthPayload {
    token: String
}

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
    createdBy: String!
    batch: String
}

input ArticleInput {
    title: String!
    body: String!
    batch: String
}

type User {
    _id: ID!
    email: String!
    batches: [Batch!]!
    articles: [Article!]!
}

input UserInput {
    email: String!
    password: String
}

type RootQuery {
    batch(_id: String): Batch
    batches: [Batch!]!
    articles: [Article!]!
    loginQuery(input: UserInput): AuthPayload!
}

type RootMutation {
    createBatch(input: BatchInput): Batch
    createArticle(input: ArticleInput): Article
    createUser(input: UserInput): AuthPayload!
}

schema {
    query: RootQuery,
    mutation: RootMutation
}
`);
