require('dotenv').config()

const express = require('express')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')

const getCacheClient = require('./src/services/cache')
const schema = require('./src/gql-schema')

const port = process.env.APP_PORT || 3000

async function main () {
  const cacheClient = await getCacheClient()
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    formatError(err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(err)
      }
      return err
    },
    context({ req }) {
      const token = req.headers.authorization

      if (!token) {
        throw new AuthenticationError('Token must be provided')
      }

      const user = {
        name: 'Vasya'
      }
      return {
        cacheClient,
        user,
      }
    }
  })
  const app = express()
  await server.start()
  server.applyMiddleware({ app })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()
