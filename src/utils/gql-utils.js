exports.getCacheKey = (controllerName = '', params = {}) => {
  let resultKey = controllerName

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      resultKey += `|${key}:${value}`
    }
  }

  return resultKey
}