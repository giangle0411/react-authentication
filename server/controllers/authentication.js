const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

function tokenForUser(user) {
  // sub: subject (who does this token belong to)
  // iat: issue at time
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password.' })
  }
  // See if a suser with the given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err)
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is used' })
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
    })
    // Save the user data to the database
    user.save(function (err) {
      if (err) {
        return next(err)
      }
      // Respond to request indicating the user was created
      // Save generated token
      res.json({ token: tokenForUser(user) })
    })
  })
}

// When signing up or signing in, give a token inexchange for an id
// User ID + Our secret string = JSON Web Token

// In the future, when a user makes an auth request, they should include their JWT
// JSON Web Token + Our secret string = User ID

// More on JWT, visit jwt.io
