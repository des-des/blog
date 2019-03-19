const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('env2')('.env')

const query = require('./lib/query')
const { indexPage, postPage } = require('./templates/')

const app = express()

app
  .use(express.static('public'))
  .use(bodyParser.json())

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app
    .use(morgan('tiny'))
}

app.get('/', (req, res) => {
  indexPage().then(html => {
    res.send(html)
  })
})

app.get('/posts/:blogName', (req, res, next) => {
  postPage(req.params.blogName).then((html) => {
    res.send(html)
  }).catch(err => {
    console.error(err);
    return res
      .status(500)
      .send({ error: 'something went wrong :('})
  })
})

app.post('/api/email', (req, res, next) => {
  query(`
    INSERT INTO person (email) VALUES ($1)
  `, [req.body.email])
  .then(() => {
    res.send({})
  }, err => {
    console.error(err)
    res
      .status(500)
      .json({ error: 'something went wrong :('})
  })
})

const port = process.env.PORT || 4000

app.listen(port, err => {
  if (err) throw err

  console.log(`server listening on port ${port}`)
})
