const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env.js');

exports.generateUuidv4 = () => {
  let uuid = "", random;
  for (let i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

exports.hashPassword = (user) => {
  return bcrypt.hash(user.password, parseInt(env.jwt.SALT_WORK_FACTOR, 10))
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      console.log(err);
    });
}

exports.validatePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}

exports.generateToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      username: payload.username,
      role: payload.role
    },
    env.jwt.SECRET,
    {
      expiresIn: env.jwt.EXPIRATION_TIME
    }
  );
}
