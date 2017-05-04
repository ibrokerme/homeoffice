const should = require('should')
const repository = require('./repository')

describe('Repository', () => {
  it('should need to connect with a promise', (done) => {
    repository.connect({}).should.be.a.Promise()
    done()
  })
})
