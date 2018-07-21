const post = require('../controller/post.controller.js');
const postmw = require('../helpers/post.middleware.js');
const usermw = require('../helpers/user.middleware.js');

module.exports = app => {

  // Create new post
  app.post('/api/posts', usermw.verifyToken, postmw.saveImageToDirectory, post.create);

  // Retrieve all post
  app.get('/api/posts', post.findAll);

  // Retrieve a post by ID
  app.get('/api/posts/:postId', post.findById);

  // app.get('/api/getComments/:id', post.getComments);

  // Update a post with ID
  app.put('/api/posts/:postId', usermw.verifyToken, post.update);

  // Delete a post with ID
  app.delete('/api/posts/:postId', usermw.verifyToken, post.delete);
}