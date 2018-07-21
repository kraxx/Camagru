module.exports = app => {
  const users = require('../controller/search.controller.js');
  
  // Fetch users with username
  app.get('/api/search/users/:query', users.findByName)
}