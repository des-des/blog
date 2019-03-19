const fs = require('fs')
const path = require('path')

const { listPostSlugs, markdown } = require('./content')
const meta = require('./meta')

module.exports = async () => {
  const slugs = await listPostSlugs()
  const posts = await Promise.all(slugs.map(async slug => {

    return {
      slug: slug,
      title: await meta.title(slug)
    }
  }))

  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Eoin's Blog</title>
        <meta property="og:title" content="des-des blog">
        <meta property="og:description" content="Eoin McCarthy's blog">
        <meta property="og:url" content="https://des-des.io/">
        <meta name="twitter:card" content="summary_large_image">
        <style>
          a {
            width: 10rem;
            height: 10rem;
            float: left;
            margin: 4rem;
            padding: 2rem;
            text-transform: uppercase;
            text-decoration: none;
            color: black;
            font-size: 3rem;
          }

          a:hover {
            background-color: #FF6300;
            color: white;
          }
        </style>
      </head>
      <body>
        ${posts.map(post => `
          <a href="${'/posts/' + post.slug}">
            ${post.title}
          </a>
        `)}
      </body>
    </html>
  `
}
