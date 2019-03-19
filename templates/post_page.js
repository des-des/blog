const templator = require('../lib/templator')

module.exports = (content, slug) => templator`
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${content.title(slug)}</title>
    <meta property="og:title" content="${content.title(slug)}">
    <meta property="og:description" content="${content.subtitle(slug)}">
    <meta property="og:url" content="https://des-des.io/posts/${slug}">
    <meta property="og:image" content="https://des-des.io/og_image.png">
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
    ${content.html(slug)}
    <style>
      ${content.rawStyle()}
    </style>
    <script defer src="/main.js"></script>
  </body>
</html>
`
