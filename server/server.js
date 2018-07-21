const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// load .env variables for local development
// require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.static('public'))

// Allow CORS
app.use('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Accept, Authorization, x-id");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});

const port = process.env.PORT || 8080;

// Access and/or create model
const db = require('./app/config/db.config.js');

db.sequelize.sync({
	// force: true // drops the table if it exists
})
.then(res => {
	console.log("Synced " + res);
})
.catch(err => {
	console.log("Error " + err);
});

require('./app/route/user.route.js')(app);
require('./app/route/post.route.js')(app);
require('./app/route/comment.route.js')(app);
require('./app/route/post_like.route.js')(app);
require('./app/route/comment_like.route.js')(app);
require('./app/route/search.route.js')(app);

// Create an admin for demonstration purposes
db.User.findAndCountAll()
.then(res => {
	if (res.count === 0) {
		console.log('Empty database, creating default admin.');
		db.User.create({
			username: 'admin',
			password: 'admin',
			email: 'admin@ad.min',
			role: 'admin',
			verified: true
		})
		.then(res => {
			console.log("Default admin created.");
		})
		.catch(err => {
			console.log(err);
		});
	}
});

const server = app.listen(port, () => {

  let serverHost = server.address().address;
  let serverPort = server.address().port;

  console.log(`App listening at http://${serverHost}:${serverPort}`)

})