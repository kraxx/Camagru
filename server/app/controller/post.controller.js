const db = require('../config/db.config.js');
const Post = db.Post;

const filterPostValues = (post) => {
  const { lastUpdate, dateOfCreation, ...data} = post;
  return data;
}

// Post a Post
exports.create = (req, res) => {
  Post.create({
    ...req.body,
    userId: req.id
  },
  {
    include: [ db.User ]
  })
  .then(post => {
    res.status(200).json({
      ...filterPostValues(post.dataValues),
      username: req.body.username,
      ok: true
    });
  })
  .catch(err => {
    console.log(`Error creating post: ${err}`);
  });
};

// Fetch all posts
exports.findAll = (req, res) => {
  console.log("FINDING ALL POSTS PROBABLY")
  Post.findAll()
  .then(posts => {

    // Getting Warning: promise not returned from console
    Promise.all(posts.map(post => {
      return db.User.findById(post.userId)
      .then(user => {
        post.dataValues.username = user.dataValues.username
        return post;
      })
      .catch(err => {
        throw new Error(err);
      });
    }))
    .then(usernameAddedPosts => {
      res.status(200).json(usernameAddedPosts);
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
  })
  .catch(err => {
    console.log(`Error finding posts: ${err}`);
    res.status(500)
    .json({
      ok: false,
      error: `Error finding posts: ${err}`
    });
  });
};

/*
I tried

exports.getComments = (req, res) => {
  console.log("ay lmao we hittin this endpoint")
  Post.getComments({where: { id: req.params.id }})
  .then(comments => {
    console.log("its gotten this far baby")
    res.status(201)
    .json(comments);
  })
  .catch(err => {
    res.status(500)
    .json(err);
  });
}
*/

// Fetch post by ID
exports.findById = (req, res) => {
  // console.log("Find post by ID got invoked");
  let id = req.params.postId;
  Post.findById(id)
  .then(post => {
    res.status(200)
    .send(post);
  })
  .catch(err => {
    console.log(`Error finding post: ${err}`);
  });;
};

// Update a post
// req.body is a JSON of new key:values
exports.update = (req, res) => {
  let id = req.params.postId;
  Post.update(
    req.body,
    {
      where: { id: id }
    })
    .then(() => {
      res.status(200)
      .send(`Successfully UPDATED post with ID: ${id}`);
    })
    .catch(err => {
      console.log(`Error updating post: ${err}`);
    });
};

// Delete post with ID
exports.delete = (req, res) => {
  // console.log("BEFORE DELETE START")
  let id = req.params.postId;
  Post.destroy({
    where: { id: id },
    individualHooks: true,
    cascade: true, //hmmmmm
    hooks: true // dunno hueheu
  })
  .then((destroyed) => {
    // console.log("Destroyed rows in POSTS: ", destroyed)
    res.status(201).json({id: req.params.id});
  })
  .catch(err => {
    console.log(`Error deleting post: ${err}`);
  });;
};