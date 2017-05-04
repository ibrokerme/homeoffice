const { EventEmitter } = require('events')
const asserts = require('assert')
const db = require('./db')
const { dbsettings } = require('./config')

describe('test my database(url validity) connection', () => {
  it('should create db equivalent object which contains urls with an eventEmitter', (done) => {
    const eventemit = new EventEmitter()

    eventemit.on('db.ready', (db) => {
      // test.equal(null, err)
      asserts.ok(db.length > 0)
      asserts.equal(db[0].host, 'data.gov.uk')
      asserts.equal(db[0].protocol, 'https:')
      console.log(db[0].host)
      done()
    })

    eventemit.on('db.error', (err) => {
      console.log(err)
    })

    db.connect(dbsettings, eventemit)

    eventemit.emit('boot.ready')
  })
})
