const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/user')

router.get('/session', async function (req, res, next) {
  console.log('the current user is', req.user)
  console.log('the current session is', req.session)
  res.send(req.session)
})

router.post('/session', passport.authenticate('local', { failWithError: true }), function (req, res) {
  res.send(req.user)
})

router.delete('/session', async function (req, res) {
  req.logout(() => {
    res.sendStatus(200)
  })
})

module.exports = router
