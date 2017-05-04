'use strict'
const http = require('http');
const https = require('https');

const repository = (connectedurl) => {
  const getclinicsbypostcode = (postcode) => {
    return new Promise((resolve, reject) => {
      const urlhref = connectedurl[0].href;
      const url = urlhref.replace('pcode', postcode);
      https.get(url, (resp) => {
        const data = [];
        resp.on('data', (chunk) => {
          data.push(chunk);
        });
        resp.on('end', () => {
          const results = JSON.parse(data.join(''))
          resolve(results.result)
        });

      }).on('error', (err) => {
        reject(new Error('An error occured fetching clinics, err:' + err))
      });

    })
  }
  const getclinicsbycity = (city) => {
    return new Promise((resolve, reject) => {
      const urlhref = connectedurl[1].href;
      const url = urlhref.replace('caddress', city);
      https.get(url, (resp) => {
        const data = [];
        resp.on('data', (chunk) => {
          data.push(chunk);
        });
        resp.on('end', () => {
          const results = JSON.parse(data.join(''))
          resolve(results.result)
        });

      }).on('error', (err) => {
        reject(new Error('An error occured fetching clinics, err:' + err))
      });
    })
  }

  const disconnect = () => {
    //close db here id database is used.
  }
  return Object.create({
    getclinicsbypostcode,
    getclinicsbycity,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection/db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, { connect })
