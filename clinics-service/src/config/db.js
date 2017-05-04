const urls = ["https://data.gov.uk/data/api/service/health/clinics?postcode=pcode", "https://data.gov.uk/data/api/service/health/clinics?city=caddress"]
const checkurlexists = (urls, callback) => {
  const paths = [];
  const urlpath = require("url");

  urls.map((url) => {
    paths.push(urlpath.parse(url))
  })
  return callback(paths);
}
const connect = (options, eventemit) => {
  eventemit.once('boot.ready', () => {
    checkurlexists(urls, (resp) => {
       if (resp != null || typeof (resp) != 'undefined') {
          eventemit.emit('db.ready', resp)
        }
        else {
          eventemit.emit('db.error', 'url not active')
        }
    })
  })
}

module.exports = Object.assign({}, { connect })
