const { User } = require('../services/db/models')

const contId = process.env.CONTAINER_ID || 'NO DATA'

// let cache = {}
//
// setInterval(() => {
//   cache = {}
// }, 1000 * 10)

// setInterval(() => {
//   console.log('CONSOLE: CURRENT CACHED KEYS', Object.keys(cache))
// }, 1000 * 3)

const getCacheKey = (controllerName = '', params = {}) => {
  let resultKey = controllerName

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      resultKey += `|${key}:${value}`
    }
  }

  return resultKey
}

exports.findUsers = async (req, res) => {
  const { limit = 500, offset = 0 } = req.query
  const limitAndOffsetParams = {
    limit,
    offset,
    order: [
      ['id', 'DESC'],
    ],
  }
  const cacheKey = getCacheKey('findUsers', limitAndOffsetParams)
  console.log('CONSOLE: cacheKey', cacheKey)
  console.time('findUsers')

  const cachedData = await req.cacheClient.get(cacheKey) // String | null
  const users = await (cachedData ? JSON.parse(cachedData) : User.findAll(limitAndOffsetParams))

  res.set('X-DATA-SOURCE', cachedData ? 'CACHE' : 'DATABASE')

  if (!cachedData) {
    await req.cacheClient.set(cacheKey, JSON.stringify(users), { EX: 60 })
  }

  console.timeEnd('findUsers')
  res.set('X-CONTAINER-ID', contId)
  res.send(users)
}

exports.editUser = async (req, res) => {
  // const user = await User.create(req.body)
  // res.send(user)
  await req.cacheClient.del('findUsers*')
}

exports.createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.send(user)
}
