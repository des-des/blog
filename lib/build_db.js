const query = require('./query.js')

query(`
  CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL
  )
`).then(() => {
  console.log('Created database')
}, e => {
  console.error('failed to create database')
  console.error(e)
})
