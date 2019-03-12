const marked = require('marked')
const fs = require('fs')
const path = require('path')

const compose = (next, ...fns) => arg => {
  if (fns.length === 0) return next(arg)

  return compose(...fns)(next(arg))
}

const css = () => fs.readFileSync(
  path.join(__dirname, '..', 'public', 'style.css')).toString()

const js = () => fs.readFileSync(
  path.join(__dirname, '..', 'public', 'main.js')).toString()

const template = body => `
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Eoin's Blog</title>
  </head>
  <body>
    <style>
      ${css()}
    </style>
    ${body}
    <script>
      ${js()}
    </script>
  </body>
</html>
`
const bufferToString = buff => buff.toString()

const replace = (name, value) => template => template.replace(`__${name}__`, value)

const bufferToHtml = compose(
  bufferToString,
  str => marked(str, {smartypants: true, headerIds: false }),
  template,
  replace('email-url', '/api/email'))

module.exports = blogName => cb => {
  const fileName = `${blogName}.md`
  const filePath = path.join(__dirname, '..', 'posts', fileName)

  fs.readFile(filePath, (err, markdownBuffer) => {
    if (err) return cb(err)

    cb(null, bufferToHtml(markdownBuffer))
  })
}
