const { Router } = require('express')

const routes = Router()

routes.get('/users', (request, response) => {
  return response.json({ message: 'Hello Worlds' })
})

module.exports = routes
