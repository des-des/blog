require('env2')('../.env')

const { Client } = require('pg')

module.exports = async (query, queryArgs) => {

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })

  client.connect()

  const response = await client.query(query, queryArgs)

  client.end()

  return response
}
