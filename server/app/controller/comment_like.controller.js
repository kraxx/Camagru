const db = require('../config/db.config.js');
const CommentLike = db.CommentLike;

// Post a Post-Like association
// findOrCreate first finds if an entry exists; creates if it doesnt
exports.create = (req, res) => {
  CommentLike.findOrCreate({
    where: {
      userId: req.body.userId,
      commentId: req.body.commentId
    },
    defaults: {
      like: req.body.like,
      favorite: req.body.favorite
    }
  })
  .spread((post_like, created) => {
    if (created) {
      res.status(200)
      .send(post_like);
    } else {
      res.send("Post-Like association already exists")
    }
  })
  .catch(err => {
    console.log(`Error creating post_like: ${err}`);
  });
};

// Fetch all comment_likes
exports.findAll = (req, res) => {
  CommentLike.findAll()
  .then(comment_likes => {
    res.status(200)
    .json(comment_likes)
  })
  .catch(err => {
    console.log(`Error finding comment_likes: ${err}`);
  });
};

// Fetch post_like by ID
exports.findById = (req, res) => {
  console.log("Find post_like by ID got invoked");
  let id = req.params.id;
  CommentLike.findById(id)
  .then(post_like => {
    res.status(200)
    .send(post_like);
  })
  .catch(err => {
    console.log(`Error finding post_like: ${err}`);
  });;
};

// Update a CommentLike
// req.body is a JSON of new key:values
exports.update = (req, res) => {
  let id = req.params.id;
  CommentLike.update(
    req.body,
    {
      where: { id: id }
    })
    .then(() => {
      res.status(200)
      .send(`Successfully UPDATED post_like with ID: ${id}`);
    })
    .catch(err => {
      console.log(`Error updating post_like: ${err}`);
    });
};

// Delete post_like with ID
exports.delete = (req, res) => {
  let id = req.params.id;
  CommentLike.destroy({
    where: { id: id }
  })
  .then(() => {
    res.status(200)
    .send(`Successfully DELETED post_like with ID: ${id}`);
  })
  .catch(err => {
    console.log(`Error deleting post_like: ${err}`);
  });;
};