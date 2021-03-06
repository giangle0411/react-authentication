// Main starting point of the application
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors')

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true })

// App Setup
// Middlewares - Any incoming request will be passed to
// morgan and bodyParser
// Morgan is a logging framework, logging incoming request (used for debugging)
// bodyParser parse the request into json
// routing using router.js
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server Setup
// Low level request handling
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)
