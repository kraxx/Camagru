const request = require('request');

const hostURL = 'http://localhost:8081'

const addEntry = (database, info) => {
  let options = {
    method: 'post',
    url: `${hostURL}/api/${database}`,
    json: true,
    body: info
  };
  request(options, (err, res, body) => {
    if (err) {
      console.error(`ERRROR CREATING ${database.slice(0, -1)}: ${err}`);
    } else {
      console.log(`SUCCESS CREATING ${database.slice(0, -1)}:\n${body}`);
    }
  });
};

const addUser = (username, password, email) => {
  let info = {
    username: username,
    password: password,
    email: email,
    role: 'user',
    verified: true
  };
  addEntry('users', info);
};

const addAdmin = (username, password, email) => {
  let info = {
    username: username,
    password: password,
    email: email,
    role: 'admin',
    verified: true
  };
  addEntry('users', info);
};

const getEntry = (database, target) => {

  let url;
  if (target) {
    url = `${hostURL}/api/${database}/${target}`
  } else {
    url = `${hostURL}/api/${database}`
  }

  let options = {
    method : 'get',
    url: url
  };

  request(options, (err, res, body) => {
    if (err) {
      console.error(`ERROR GETTING ${database}: ${err}`);
    } else {
      // SOMETHING WRONG HERE
      let parsed = JSON.parse(body);
      if (target) {
        console.log(`SUCCESS GETTING ${database.slice(0, -1)}: ${parsed.username}: ${parsed}`);
      } else {
        console.log(`SUCCESS GETTING ${database}: ${parsed}`);
        for (let row in parsed) {
          console.log(parsed[row]);
        }
      }
    }
  });
};

const getUser = (userId) => {
  getEntry('users', userId);
};

const getAllUsers = () => {
  getEntry('users');
}

const login = (username, password) => {
  let options = {
    method: 'post',
    url: `${hostURL}/api/authenticate`,
    json: true,
    body: {
      username: username,
      password: password
    }
  };
  request(options, (err, res, body) => {
  if (err) {
    console.error(`ERROR LOGGING IN: ${err}`);
  } else {
    console.log(`SUCCESS LOGGING IN:\n${JSON.stringify(body)}`);
  }
});
}

module.exports = {
  addUser,
  addAdmin,
  getAllUsers,
  getUser,
  login
};