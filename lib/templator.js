const content = require('./content')
const memo = require('./memo')

module.exports = async (strings, ...args) => {
  const results = (await Promise.all(args))
    .map(result => Array.isArray(result)
      ? result.join('')
      : result)

  const html = strings.reduce(
    (output, next, j) =>
      output + next + (j === strings.length - 1 ? '' : results[j])
    , '')

  return html
}
