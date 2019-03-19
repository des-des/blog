const slugMem = require('./slug_mem')
const content = require('./content')

const title = async slug => {
  const markdown = await content.markdown(slug)

  return markdown.match(/^# (.+)/)[1]
}

const subtitle = async slug => {
  const markdown = await content.markdown(slug)

  const match = markdown.match(/^## (.+)/)

  if (match) return match[1]
}

module.exports = {
  title: slugMem(title),
  subtitle: slugMem(subtitle)
}
