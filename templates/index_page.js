const templator = require('../lib/templator')

module.exports = content => templator`
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
    ${(content.utils.map(content.postSlugs(), slug => templator`
      <a href="/posts/${slug}">
        ${(content.title(slug))}
      </a>
    `))}
  </body>
</html>
`
