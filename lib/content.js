const fs = require('fs')
const path = require('path')
const marked = require('marked')

const memo = require('./memo')

const postDirPath = path.join(__dirname, '..', 'posts')

const postSlugs = (() => {
  let result;
  return () => new Promise((resolve, reject) => {
    if (result) return resolve(result)

    fs
      .readdir(postDirPath, (err, fileNames) => {
        if (err) return reject(err)

        resolve(fileNames.map(fileName => fileName.split('.')[0]))
      })
  })
})()

const markdown = slug => new Promise((resolve, reject) => {
  fs.readFile(path.join(postDirPath, `${slug}.md`), (err, buffer) => {
    if (err) return reject(err)

    resolve(buffer.toString())
  })
})

const html = async slug => {
  const md = await markdown(slug)

  return marked(md, {smartypants: true, headerIds: false })
}

const title = async slug => {
  const md = await markdown(slug)

  return md.match(/^# (.+)/m)[1]
}

const subtitle = async slug => {
  const md = await markdown(slug)
  const match = md.match(/^## (.+)/m)

  if (match) return match[1]
}

const css = fs.readFileSync(
  path.join(__dirname, '..', 'public', 'style.css')).toString()

const rawStyle = () => Promise.resolve(css)

module.exports = {
  postSlugs,
  rawStyle,
  markdown: memo(markdown),
  title: memo(title),
  subtitle: memo(subtitle),
  html: memo(html),
  utils: {
    map: async (promisedArray, mapper) => {
      const mappable = await promisedArray
      return Promise.all(mappable.map(mapper))
    }
  }
}
