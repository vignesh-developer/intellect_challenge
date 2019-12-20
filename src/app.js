require('./db/mongoose')

const express = require('express')
const tradeRouter = require('./routers/trade.route')

const app = express()


app.use(express.json())

app.use(tradeRouter)

module.exports = app