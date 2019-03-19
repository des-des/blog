const content = require('../lib/content')
const memo = require('../lib/memo')

const indexPage = require('./index_page')
const postPage = require('./post_page')

module.exports = {
  indexPage: memo(() => indexPage(content)),
  postPage: memo(slug => postPage(content, slug))
}
