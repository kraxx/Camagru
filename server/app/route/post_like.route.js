module.exports = app => {
  const post_like = require('../controller/post_like.controller.js');

  // Create new post_like
  app.post('/api/post_likes', post_like.create);

  // Retrieve all post_like
  app.get('/api/post_likes', post_like.findAll);

  // Retrieve a post_like by ID
  app.get('/api/post_likes/:id', post_like.findById);

  // Update a post_like with ID
  app.put('/api/post_likes/:id', post_like.update);

  // Delete a post_like with ID
  app.delete('/api/post_likes/:id', post_like.delete);
}