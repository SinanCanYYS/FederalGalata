require('dotenv').config()
require('./database-connection')

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongoose = require('mongoose')

const indexRouter = require('./routes')
const accountsRouter = require('./routes/accounts')
const usersRouter = require('./routes/users')
const suppliersRouter = require('./routes/suppliers')
const productsRouter = require('./routes/products')
const rawMaterialsRouter = require('./routes/raw-materials')
const purchasesRouter = require('./routes/purchases')
const stocksRouter = require('./routes/stocks')
const salesRouter = require('./routes/sales')

const User = require('./models/user')
const passport = require('passport')

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const app = express()

app.set('trust proxy', 1)

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const clientPromise = mongoose.connection.asPromise().then(connection => (connection = connection.getClient()))

app.use(
  session({
    secret: 'waldIst7135!',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    },
    store: MongoStore.create({ clientPromise: clientPromise, stringify: false }),
    // store: MongoStore.create({ mongoUrl: process.env.MONGODB_CONNECTION_STRING }),
  })
)

app.use(passport.initialize())

app.use(passport.session())

app.use((req, res, next) => {
  // console.log('Session: ', req.session)
  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/accounts', accountsRouter)
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
