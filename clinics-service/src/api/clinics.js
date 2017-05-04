'use strict'
const status = require('http-status')
const finaloutput = {
  results: {}
};
const processcity = (cities) => {
  const countedpostcode = cities.reduce((allpostcodes, name) => {
    if (name.partial_postcode in allpostcodes) {
      allpostcodes[name.partial_postcode]++;
    }
    else {
      allpostcodes[name.partial_postcode] = 1;
    }
    return allpostcodes;
  }, {});
  return countedpostcode;
}
const processpostcode = (postcodes) => {
  return postcodes.map((postcode) => {
    return { organisation_id: postcode.organisation_id, name: postcode.name };
  });
}
module.exports = (app, options) => {
  const { repo } = options
  app.get('/clinics/postcode/:postcode', (req, res, next) => {
    repo.getclinicsbypostcode(req.params.postcode).then(response => {  
      const initialoutput = processpostcode(response);    
      finaloutput.results = initialoutput;
      res.status(status.OK).json(finaloutput)
    }).catch(next)
  })

  app.get('/clinics/city/:name', (req, res, next) => {
    repo.getclinicsbycity(req.params.name).then(response => {
      const initialoutput = processcity(response);
      finaloutput.results = initialoutput;
      res.status(status.OK).json(finaloutput)
    }).catch(next)
  })


}
