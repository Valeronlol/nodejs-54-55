require('dotenv').config()

const express = require('express')
const router = require('./src/router')
const getCacheClient = require('./src/services/cache')

const app = express()

const port = process.env.APP_PORT || 3000

app.use(express.json())
app.use(async (req, res, next) => {
  req.cacheClient = await getCacheClient()
  next()
})
app.use(router)

async function main () {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()
