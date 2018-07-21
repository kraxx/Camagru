const users = require('../controller/user.controller.js');
const usermw = require('../helpers/user.middleware.js');

module.exports = app => {

  // Create new user
  app.post('/api/users', users.create({ registration: false }));

  // Retrieve all users
  app.get('/api/users', usermw.verifyTokenAdmin, users.findAll);

  // Retrieve a user by ID
  app.get('/api/users/:id', usermw.verifyTokenUser, users.findById);

  // Update a user with ID
  app.put('/api/users/:id', usermw.verifyTokenUser, usermw.rehashPassword, users.update);

  // Delete a user with ID
  app.delete('/api/users/:id', usermw.verifyTokenUser, users.delete);

  /*************
  Authentication
  *************/

  // Handle user login
  app.post('/api/login', users.login, usermw.generateTokenForUser);

  // Handle registration
  app.post('/api/register', users.create({ registration: true }), usermw.setRegisterToken, users.register);

  // Verify user
  app.get('/api/verify/:token', usermw.verifyDatabaseToken, users.verifyNewUser);

  // Send password reset
  app.get('/api/forgot_password/:email', usermw.setRegisterToken, users.forgotPassword);

  // Finalize password reset
  app.put('/api/reset_password/:token', usermw.verifyDatabaseToken, usermw.rehashPassword, users.resetPassword)

  /***
  Misc
  ***/

  // Decode data
  // app.get('/api/decode', usermw.verifyToken, users.decode);
}