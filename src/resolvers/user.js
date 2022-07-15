const { gql } = require('apollo-server-express')

const { User } = require('../services/db/models')
const { getCacheKey } = require('../utils/gql-utils')

exports.findUsers = async (_, args, ctx) => {
  const limitAndOffsetParams = {
    limit: args.limit,
    offset: args.offset,
    order: [
      ['id', 'DESC'],
    ],
  }
  const cacheKey = getCacheKey('findUsers', limitAndOffsetParams)
  console.time('findUsers')

  const cachedData = await ctx.cacheClient.get(cacheKey) // String | null
  const users = await (cachedData ? JSON.parse(cachedData) : User.findAll(limitAndOffsetParams))

  if (!cachedData) {
    await ctx.cacheClient.set(cacheKey, JSON.stringify(users), { EX: 60 })
  }

  console.timeEnd('findUsers')
  return users
}

exports.findUser = (_, args) => {
  console.log('CONSOLE:args ', args)
  return User.findOne({
    where: {
      id: args.id
    }
  })
}

exports.createUser = (_, args) => {
  return User.create(args.userData)
}

exports.UserGqlSchemas = gql`
    type User {
        id: ID!
        firstName: String!
        email: String!
        mood: String!
        lastName: String
        age: Int
        createdAt: DateTime!
        updatedAt: DateTime
    }

    type Query {
        findUsers (limit: Int = 100, offset: Int = 0): [User]
        findUser (id: ID!): User
    }

    input CreateUserData {
        firstName: String!
        email: String!
        mood: String!
        lastName: String
        age: Int
    }

    type Mutation {
        createUser(userData: CreateUserData): User
    }
`