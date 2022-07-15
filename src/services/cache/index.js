const { createClient } = require('redis')

const client = createClient({
  url: `redis://cache_server:6379`,
})

client.on('error', (err) => console.log('Redis Client Error', err))

module.exports = async () => {
  if (!client.isReady) {
    await client.connect()
  }
  return client
}
