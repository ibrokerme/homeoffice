const server = require('./server')

describe('Server', () => {
  it('should need a port to start', () => {
    return server.start({
      repo: {}
    }).should.be.rejectedWith(/port/)
  })

  it('should need a repository to start', () => {
    return server.start({
      port: {}
    }).should.be.rejectedWith(/repository/)
  })
})
