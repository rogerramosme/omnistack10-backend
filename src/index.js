const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
require('dotenv/config')

const app = express()
const { DB_USERNAME, DB_PASSWORD } = process.env
const DB_ADDRESS = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0-pqqqz.mongodb.net/week10?retryWrites=true&w=majority`

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333)
