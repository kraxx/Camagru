const bcrypt = require('bcrypt');
const env = require('../config/env.js');
const auth = require('../helpers/auth.js');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      username: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        validate: {
          notEmpty: true,
          is: /^[a-z0-9\_\-]+$/i, // no crazy usernames
          len: [3, 30] // no long usernames
        }
      },
      password: {
        type: Sequelize.STRING,
        required: true,
        validate: {
          notEmpty: true,    
          len: [1, 128] // lol nvm
        }
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      role: {
        type: Sequelize.ENUM,
        values: ['user', 'admin', 'disabled'],
        defaultValue: 'user'
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      token: {
        type: Sequelize.STRING
      },
      tokenDate: {
        type: Sequelize.DATE
      }
    },
    {
      updatedAt: 'lastUpdate',
      createdAt: 'dateOfCreation',
      // paranoid: true, // Will not be returned in queries if deleted
      classMethods: {

        validatePassword: (password, hash) => {
          bcrypt.compare(password, hash)
          .then(res => {
            return res;
          });
        }

      },
      hooks: {

        beforeCreate: (user => {
          return auth.hashPassword(user);
        })

      }
    }
  );
  
  return User;
}