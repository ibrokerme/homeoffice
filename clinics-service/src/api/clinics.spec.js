const request = require('supertest')
const server = require('../server/server')

describe('Clinics API', () => {
  let app = null
  let testclinics = require('../mock-data/clinics');
  let repos = {

    getclinicsbycity(name) {
      return Promise.resolve(testclinics.results.filter(clinic => clinic.city === name));
    },
    getclinicsbypostcode(postcode) {
      return Promise.resolve(testclinics.results.filter(clinic => clinic.postcode === postcode));
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3000,
      repo: repos
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })
  it('returns 200 for an known city clinics', (done) => {
    request(app)
      .get('/clinics/city/Croydon')
      .expect((res) => {
        res.body.should.containEql({ results: { CR0: 3 } })
      })
      .expect(200, done)
  })

  it('returns 200 for an known postcode clinics', (done) => {
    request(app)
      .get('/clinics/postcode/CR0 1QG')
      .expect((res) => {
        res.body.should.containEql({ "results": [{ "organisation_id": "3775563", "name": "Christopher Wren House" }] })
      })
      .expect(200, done)
  })
})
