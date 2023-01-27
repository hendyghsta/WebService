const e = require('connect-timeout')
const mssql = require('mssql')

const connect = {
    user: '**********', // user database
    password: '**********', // pass database
    server: '************', // server database
    port: 1433,
    database: 'BacaMeter',
    enableArithAbort: true,
    connectionTimeout: 600000,
    requestTimeout: 600000,
    pool: {
        idleTimeoutMillis: 600000,
        max: 100
    },
    options: {
        encrypt: false,
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

mssql.connect(connect, (err) => {
    if (err) {
        console.log(err)
        throw err
    }

    console.log('Berhasil Konek ke Sql Server')
})

module.exports = mssql