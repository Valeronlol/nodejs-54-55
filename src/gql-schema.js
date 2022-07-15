const { makeExecutableSchema } = require('@graphql-tools/schema')
const userResolver = require('./resolvers/user')
const { gql } = require("apollo-server-express");


const defaultGqlSchema = gql`
    "A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format."
    scalar DateTime
`

module.exports = makeExecutableSchema({
  typeDefs: [
    defaultGqlSchema,
    userResolver.UserGqlSchemas,
  ],
  resolvers: {
    Query: {
      findUsers: userResolver.findUsers,
      findUser: userResolver.findUser,
    },
    Mutation: {
      createUser: userResolver.createUser,
    },
  }
})