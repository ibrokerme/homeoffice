const {dbsettings, serversettings} = require('./config')
const url = require('./db')

module.exports = Object.assign({}, {dbsettings, serversettings, url})

