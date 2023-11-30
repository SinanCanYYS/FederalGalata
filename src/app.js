require('dotenv').config()
require('./database-connection')

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const suppliersRouter = require('./routes/suppliers')
const productsRouter = require('./routes/products')
const rawMaterialsRouter = require('./routes/raw-materials')
const purchasesRouter = require('./routes/purchases')
const stocksRouter = require('./routes/stocks')
const salesRouter = require('./routes/sales')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/suppliers', suppliersRouter)
app.use('/products', productsRouter)
app.use('/raw-materials', rawMaterialsRouter)
app.use('/purchases', purchasesRouter)
app.use('/stocks', stocksRouter)
app.use('/sales', salesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
