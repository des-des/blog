const fs = require('fs')
const path = require('path')

const slugMem = require('./slug_mem')

const postDirPath = path.join(__dirname, '..', 'posts')

const listPostSlugs = (() => {
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

module.exports = {
  listPostSlugs,
  markdown: slugMem(markdown)
}
