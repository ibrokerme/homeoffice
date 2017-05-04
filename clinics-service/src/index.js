'use strict'
const { EventEmitter } = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/')
const eventemit = new EventEmitter()


console.log('Connecting to clinics-service repository begins...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

eventemit.on('db.ready', (resp) => {
  repository.connect(resp)
    .then(repo => {
      console.log('Connected. Starting Server')
      return server.start({
        port: config.serversettings.port,
        repo
      })
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serversettings.port}.`)
      app.on('close', () => {
        // disconnected database
      })
    })
})

eventemit.on('db.error', (err) => {
  console.error(err)
})

//plug in database configuration
config.url.connect(config.dbsettings, eventemit)

eventemit.emit('boot.ready')
