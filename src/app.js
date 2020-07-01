const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()
const router = express.Router()

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })

const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

// Carregar as rotas
const indexRouter = require('./routes/index-router')
const productRouter = require('./routes/product-router')
const customerRouter = require('./routes/customer-router')
const orderRouter = require('./routes/order-router')

app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(bodyParser.urlencoded({ extended: false }))

// Habilitar o CORS
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use('/', indexRouter)
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)

module.exports = app