const db = require('../config/db.config.js');
const PostLike = db.PostLike;

// Post a Post-Like association
exports.create = (req, res) => {
  PostLike.findOrCreate({
    where: {
      userId: req.body.userId,
      postId: req.body.postId
    },
    defaults: {
      like: req.body.like,
      favorite: req.body.favorite
    }
  })
  .spread((post_like, created) => {
    // comment.log("CREATED??? POSTLIKE---> ", created);
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

// Fetch all post_likes
exports.findAll = (req, res) => {
  PostLike.findAll()
  .then(post_likes => {
    res.status(200)
    .json(post_likes)
  })
  .catch(err => {
    console.log(`Error finding post_likes: ${err}`);
  });
};

// Fetch post_like by ID
exports.findById = (req, res) => {
  console.log("Find post_like by ID got invoked");
  let id = req.params.id;
  PostLike.findById(id)
  .then(post_like => {
    res.status(200)
    .send(post_like);
  })
  .catch(err => {
    console.log(`Error finding post_like: ${err}`);
  });;
};

// Update a PostLike
// req.body is a JSON of new key:values
exports.update = (req, res) => {
  console.log("UPDATING POSTLIKE::: >>>", req.params.id);
  let id = req.params.id;
  PostLike.update(
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
  PostLike.destroy({
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