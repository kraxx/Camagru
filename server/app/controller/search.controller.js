const db = require('../config/db.config.js');
const User = db.User;

// Fetch users by username
exports.findByName = (req, res) => {
  User.findAndCountAll({
    where: {
      username: req.params.query
    }
  })
  .then(result => {
    console.log(result)
    res.status(200)
    .json({
      count: result.count,
      users: result.rows
    });
  })
  .catch(err => {
    console.log(`Error finding users: ${err}`);
  })
};
