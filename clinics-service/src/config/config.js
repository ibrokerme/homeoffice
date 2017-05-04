const dbsettings = {
  //needed for database configuration
}
const serversettings = {
  port: process.env.PORT || 3000
}

module.exports = Object.assign({}, { dbsettings, serversettings})
