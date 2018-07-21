const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env.js');

const auth = require('../helpers/auth.js');
const mail = require('../helpers/mail.js');
const db = require('../config/db.config.js');
const User = db.User;

// Set temporary token for registration and password reset
exports.setRegisterToken =  (req, res, next) => {
  const token = auth.generateUuidv4();
  User.update(
    { 
      token: token,
      tokenDate: Date.now()
    },
    { 
      where: db.Sequelize.or(
        { id: req.body.id },
        { email: req.params.email }
      )
    }
  )
  .then(() => {
    User.findOne({
      where: db.Sequelize.or(
        { id: req.body.id },
        { email: req.params.email }
      )
    })
    .then(user => {
      if (!user) {
        // console.log("Error: update error");
        res.status(500).json({ error: 'Error searching for user' });
      } else {
        // console.log("Successfully found user and generated token")
        req.body.id = user.id;
        next();
      }
    })
  })
  .catch(err => {
    // console.log(`Error setting register token: ${err}`);
    res.status(400).json({ error: err });
  });
}

// Middleware before login/API calls
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    // console.log("No token received from request.")
    return res.status(403)
      .send({
        auth: false,
        message: 'No token provided'
      });
  }
  jwt.verify(token, env.jwt.SECRET, (err, decoded) => {
    if (err) {
      // console.log("Bad token.")
      return res.status(500)
        .send({
          auth: false,
          message: 'Failed to authenticate token'
        });
    } else {
      // console.log('DEC:', decoded)
      req.id = decoded.id;
      req.body.username = decoded.username;
      next()
    }
  });
}

exports.verifyTokenUser = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    // console.log("No token received from request.");
    return res.status(403)
      .send({
        auth: false,
        message: 'No token provided'
      });
  }
  jwt.verify(token, env.jwt.SECRET, (err, decoded) => {
    if (err) {
      // console.log("Bad token.");
      return res.status(500)
        .send({
          auth: false,
          message: 'Failed to authenticate token'
        });
    } else if (decoded.role !== 'admin' && decoded.id !== req.params.id) {
      console.log("User is not authorized");
      return res.status(403)
      .send({
        auth: false,
        message: 'Requester is not authorized'
      });
    } else {
      // console.log('DEC:', decoded)
      // req.id = decoded.id;
      // req.body.username = decoded.username;
      next()
    }
  });
}

exports.verifyTokenAdmin = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    // console.log("No token received from request.");
    return res.status(403)
      .send({
        auth: false,
        message: 'No token provided'
      });
  }
  jwt.verify(token, env.jwt.SECRET, (err, decoded) => {
    if (err) {
      // console.log("Bad token.");
      return res.status(500)
        .send({
          auth: false,
          message: 'Failed to authenticate token'
        });
    } else if (decoded.role !== 'admin') {
      // console.log("User is not admin");
      return res.status(403)
      .send({
        auth: false,
        message: 'Requester is not admin'
      });
    } else {
      // console.log('DEC:', decoded)
      // req.id = decoded.id;
      // req.body.username = decoded.username;
      next()
    }
  });
}

exports.verifyDatabaseToken = (req, res, next) => {
  const token = req.params.token;
  // console.log(token, req.params.token, req.query.q)
  User.find({ where: { token: token }})
  .then(user => {
    if (!user) {
      // console.log('Error: no user found');
      res.status(400)
      .json({
        error: 'Error: no user found'
      });
    } else {
      if (Date.now() - user.tokenDate > env.jwt.EXPIRATION_TIME) {
        // console.log('Token expired: ', Date.now() - user.tokenDate);
        res.status(400)
        .json({
          error: 'Error: token expired'
        });
      } else {
        req.body.id = user.id;
        next();
      }
    }
  })
  .catch(err => {
    console.log(`Caught error: ${err}`);
    res.status(400).redirect('/invalid_token');
  })

}

exports.generateTokenForUser = (req, res) => {
  const token = auth.generateToken(req.tokenPayload);
  res.status(200)
  .json({
    ...req.tokenPayload,
    ok: true,
    token: token
  });
}

exports.rehashPassword = (req, res, next) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, env.jwt.SALT_WORK_FACTOR)
    .then(hash => {
      req.body.password = hash;
      next();
    })
    .catch(err => {
      // console.log(`Error rehashing password: ${err}`);
      res.status(400).json(err);
    });
  } else {
    next();
  }
}