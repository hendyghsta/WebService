const express = require('express')
const http = require('http')
const port = process.env.PORT || 4000 // port pada webservice
const constant = require('./const');
const routes = require('./routes')

const cors = require('cors')
const cookie = require('cookie-parser')
const timeout = require('connect-timeout')
const morgan = require('morgan')

const app = express()
const server = http.createServer(app)
const rootPath = constant.rootPath

app.use(cors())
app.use(timeout('120s'))
app.use(cookie())

app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({extended: false}))

app.use(morgan('dev'))

function haltOnTimeout(req, res, next) {
    if (!req.timedout) next()
}

function errorHandler(err, req, res, next){
    console.log('Oops!')
}

app.use(haltOnTimeout)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Web Service Work!')
})

app.get(rootPath, (req, res) => {
    res.send('RestAPI running')
})

routes(app)

server.listen(port, () => {
    console.log(`Web Service sudah jalan pada port ${port}`)
})