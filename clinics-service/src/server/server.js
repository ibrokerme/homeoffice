const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
var cluster = require('cluster');

const api = require('../api/clinics')
const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('No connected repository'))
    }
    if (!options.port) {
      reject(new Error('This is no available port'))
    }
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Error occured:' + err))
      res.status(500).send('Oops error occurred!')
    })


    api(app, options)

    const server = app.listen(options.port, () => resolve(server))

  })
}
module.exports = Object.assign({}, { start })



