const usermw = require('../helpers/user.middleware.js');
const comment = require('../controller/comment.controller.js');

module.exports = app => {

  // Create new comment
  app.post('/api/comments', usermw.verifyToken, comment.create);

  // Retrieve all comment by Post ID
  // app.get('/api/comments', comment.findAll);

  // Retrieve a comment by ID
  app.get('/api/comments/:id', comment.findById);

  // Update a comment with ID
  app.put('/api/comments/:id', usermw.verifyToken, comment.update);

  // Delete a comment with ID
  app.delete('/api/comments/:id', usermw.verifyToken, comment.delete);
}