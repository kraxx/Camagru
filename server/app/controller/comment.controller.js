const db = require('../config/db.config.js');
const Comment = db.Comment;

// comment a comment
exports.create = (req, res) => {
  // console.log("Creating a comment!")
  Comment.create({
    ...req.body,
    userId: req.id
  },
  {
    include: [ db.User, db.Post ]
  })
  .then(comment => {
    // console.log("Comment created!", comment);
    comment.dataValues.username = req.body.username;
    res.status(200)
    .json(comment);
  })
  .catch(err => {
    console.log(`Error creating comment: ${err}`);
  });
};

// Fetch all comments
exports.findById = (req, res) => {
  // console.log("we finding!", req.params.id)
  Comment.findAll({
    where: { postId: req.params.id }
  })
  .then(comments => {
    Promise.all(comments.map(comment => {
      return db.User.findById(comment.userId)
      .then(user => {
        comment.dataValues.username = user.dataValues.username
        return comment;
      })
      .catch(err => {
        throw new Error(err);
      });
    }))
    .then(usernameAddedComments => {
      res.status(200)
      .json(usernameAddedComments);
    })
  })
  .catch(err => {
    console.log(`Error finding comments: ${err}`);
    res.status(400)
    .json(err);
  });
};

// // Fetch comment by ID
// exports.findById = (req, res) => {
//   console.log("Find comment by ID got invoked");
//   let id = req.params.commentId;
//   Comment.findById(id)
//   .then(comment => {
//     res.status(200)
//     .send(comment);
//   })
//   .catch(err => {
//     console.log(`Error finding comment: ${err}`);
//   });;
// };

// Update a comment
// req.body is a JSON of new key:values
exports.update = (req, res) => {
  let id = req.params.commentId;
  Comment.update(
    req.body,
    {
      where: { id: id }
    })
    .then(() => {
      res.status(200)
      .send(`Successfully UPDATED comment with ID: ${id}`);
    })
    .catch(err => {
      console.log(`Error updating comment: ${err}`);
    });
};

// Delete comment with ID
exports.delete = (req, res) => {
  Comment.destroy({
    where: { id: req.params.id }
  })
  .then(() => {
    res.status(201).json({id: req.params.id});
  })
  .catch(err => {
    console.log(`Error deleting comment: ${err}`);
  });;
};