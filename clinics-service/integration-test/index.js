/* eslint-env mocha and to be configured */
const supertest = require('supertest')

describe('clinics-service', () => {
  const api = supertest('http://000.000.0.0:3000')
  it('returns a 200 for clinics in a supplied postcode', (done) => {
    api.get('/clinics/postcode/GU14 8SU')
      .expect(200, done)
  })
})
