module.exports = app => {
  const comment_like = require('../controller/comment_like.controller.js');

  // Create new comment_like
  app.post('/api/comment_likes', comment_like.create);

  // Retrieve all comment_like
  app.get('/api/comment_likes', comment_like.findAll);

  // Retrieve a comment_like by ID
  app.get('/api/comment_likes/:id', comment_like.findById);

  // Update a comment_like with ID
  app.put('/api/comment_likes/:id', comment_like.update);

  // Delete a comment_like with ID
  app.delete('/api/comment_likes/:id', comment_like.delete);
}