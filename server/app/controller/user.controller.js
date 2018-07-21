const auth = require('../helpers/auth.js');
const mail = require('../helpers/mail.js');
const postmw = require('../helpers/post.middleware.js');
const db = require('../config/db.config.js');
const User = db.User;

const filterUserBasic = (user) => {
  const { password, lastUpdate, dateOfCreation, token, tokenDate, ...data } = user;
  return data;
}

const filterUserAdmin = (user) => {
  const { password, token, tokenDate, ...data } = user;
  return data;
}

// Manually create user
exports.create = (options) => {
  return (req, res, next) => {
    const verified = options.registration ? false : true;
    User.create({
      ...req.body,
      verified: verified
    })
    .then(user => {
      if (!user) {
        console.log("Error: user creation error");
        res.status(500).json({ error: 'Error creating user' });
      } else {
        if (options.registration === true) {
          req.body.id = user.id;
          next();
        } else {
          // console.log("THE RETURN FROM CREATE: ", filterUserBasic(user.dataValues));
          res.status(201).json(filterUserBasic(user.dataValues));
        }
      }
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      res.status(500).json(err);
    });
  };  
};

// Fetch all users
exports.findAll = (req, res) => {
  User.findAll()
  .then(users => {
    const data = [];
    for (let user of users) {
      data.push(filterUserAdmin(user.dataValues));
    }
    res.status(200).json(data);
  })
  .catch(err => {
    console.log(`Error finding users: ${err}`);
    res.status(400).json(err);
  });
};

// Fetch user by ID
exports.findById = (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    console.log(`Error finding user: ${err}`);
    res.status(400).json(err);
  });;
};

// Update a User
// req.body is a JSON of new key:values
exports.update = (req, res) => {
  // console.log("UPDATE CALLED")
  // console.log("USER ID::: ", req.params.id)
  User.update(
    req.body,
    {
      where: { id: req.params.id },
      individualHooks: true
    }
  )
  .then(user => {
    User.findById(req.params.id)
    .then(retUser => {
      // console.log("retUser bout to be ressed", retUser)
      res.status(201).json(filterUserBasic(retUser.dataValues));
    })
    .catch(err => {
      console.log(`Error: ${err}`)
      res.status(500).json(err);
    })
  })
  .catch(err => {
    console.log(`Error: ${err}`)
    res.status(400).json(err);
  });
};

// Delete user with ID
exports.delete = (req, res) => {
  // Hacky workaround until I get Sequelize hooks to work properly
  db.Post.findAll({
    where: { userId: req.params.id }
  })
  .then(posts => {
    posts.forEach(post => {
      postmw.deleteImageFromDirectory(post);
    });
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })

  User.destroy({
    where: { id: req.params.id },
    individualHooks: true,
    hooks: true,
    cascade: true,
  })
  .then(destroyed => {
    // console.log("Destroyed rows in USER: ", destroyed)
    res.status(200).json({id: req.params.id});
  })
  .catch(err => {
    console.log(`Error deleting user: ${err}`);
    res.status(400).json(err);
  });
};

// Handle user login
exports.login = (req, res, next) => {
  User.find({ where: { username: req.body.username }})
  .then(user => {
    if (!user) {
      res.status(400)
      .json({
        ok: false,
        error: 'No such user exists'
      });      
    } else if (!user.verified) {
      res.status(403).json({ error: 'User not verified. Check your e-mail or resend verification link' });
    } else if (user.role === 'disabled') {
      res.status(403).json({ error: 'User is currently disabled.' });
    } else {
      auth.validatePassword(req.body.password, user.password)
      .then(validated => {
        if (!validated) {
          res.status(401)
          .json({
            ok: false,
            error: 'Incorrect credentials'
          });
        } else {
          req.tokenPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          };
          next();
        }
      })
      .catch(err => {
        // console.log(`Error: ${err}`);
        res.status(400)
        .json({
          ok: false,
          error: "Server error: validation issue"
        });
      });
    }
  }, err => {
    // console.log(`Error: ${err}`);
  })
  .catch(err => {
    // console.log(`Error: ${err}`);
    res.status(400).json(err);;
  });
}

// Handle user registration
exports.register = (req, res) => {
  User.find({ where: {id: req.body.id}})
  .then(user => {
    mail.sendVerificationMail(user.username, user.email, user.token);
    res.status(200).json(filterUserBasic(user.dataValues));
  })
  .catch(err => {
    // console.log(`Registration e-mail not sent: ${err}`);
    res.status(400).json({ error: err });
  });
}

// Verify new user
exports.verifyNewUser = (req, res) => {
  User.update({
    verified: true,
    token: null,
    tokenDate: null
  }, {
    where: { id: req.body.id }
  })
  .then(retUser => {
    // res.status(202).redirect('/verified_user');
    res.status(202).json({
      user: retUser
    });
  })
  .catch(err => {
    // res.status(500).redirect('/server_issue');
    res.status(500)
    .json({
      error: 'Error: server issue'
    });
  })
}

// Handle forgotten password
exports.forgotPassword = (req, res) => {
  User.findOne({ where: { email: req.params.email }})
  .then(user => {
    if (!user) {
      res.status(401).json({ error: 'e-mail address does not exist in database' });
    } else {
      mail.sendPasswordResetMail(user.username, user.email, user.token);
      res.status(201).json({
        ok: true
      });
    }
  })
  .catch(err => {
    // console.log("Error finding user in forgotPassword")
    res.status(401).json(err);
  });
}

exports.resetPassword = (req, res) => {
  User.update({
    password: req.body.password,
    token: null,
    tokenDate: null
  }, { where: {id: req.body.id }
  })
  .then(() => {
    res.status(201).json({ ok: true });
  })
  .catch(err => {
    res.status(500).json(err);
  });
}

// Test endpoint to decode token
// exports.decode = (req, res) => {
//   User.findById(req.id, {
//     attributes: { exclude: ['password'] }
//   })
//   .then(user => {
//     if (!user) {
//       res.status(500).json({error: 'Problem finding user'});
//     } else {
//       // console.log("Decoded payload return: ", user.dataValues);
//       res.status(202).json(user.dataValues);
//     }
//   })
//   .catch(err => {
//     res.status(400).json({error: 'No such user'});
//   });
// }