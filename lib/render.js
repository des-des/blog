const marked = require('marked')
const fs = require('fs')
const path = require('path')

const content = require('./content')
const meta = require('./meta')
const slugMem = require('./slug_mem')

const compose = (next, ...fns) => arg => {
  if (fns.length === 0) return next(arg)

  return compose(...fns)(next(arg))
}

const css = () => fs.readFileSync(
  path.join(__dirname, '..', 'public', 'style.css')).toString()

const template = ({ title, subtitle, body, slug }) => `
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${subtitle}">
    <meta property="og:url" content="https://des-des.io/posts/${slug}">
    <meta name="twitter:card" content="summary_large_image">
  </head>
  <body>
    <style>
      body {
        font-family: 'Source Sans Pro', sans-serif;
        margin: 0;
        padding: 0;
      }

      h1 {
        font-size: 5rem;
        padding: 10rem;
        color: #FF6300;
        text-transform: uppercase;

      }
      @media only screen and (max-width: 768px) {
        h1 {
          font-size: 3rem;
          padding: 5rem;
        }
      }
    </style>
    ${body}
    <style>
      ${css()}
    </style>
    <script defer src="/main.js">
  </body>
</html>
`
const replace = (name, value) => template => template.replace(`__${name}__`, value)

module.exports = slugMem(async slug => {
  const markdown = await content.markdown(slug)
  const html = marked(markdown, {smartypants: true, headerIds: false })

  const document = template({
    body: html,
    title: await meta.title(slug),
    subtitle: await meta.subtitle(slug),
    slug
  })

  return replace('email-url', '/api/email')(document)
})
