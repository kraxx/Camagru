const axios = require('axios');
const env = require('../config/env.js');

const hostDomain = env.HOST_DOMAIN;
const mailService = env.mail.MY_MAIL_SERVICE;

const verificationMessage = (username, token) => (
`Hello ${username}!

Thanks for registering with Camagru!

Please use the following link to verify your account:

https://${hostDomain}/verify?q=${token}

Cheers!

kraxx`
)

const resetPasswordMessage = (username, token) => (
`Hello ${username}!

Please use the following link to reset your password:

https://${hostDomain}/reset_password?q=${token}

Cheers!

kraxx`
)

const sendMail = (username, email, message) => {

  axios.post(mailService, {
    name: username,
    email: email,
    message: message
  })
  .catch(err => {
    console.log(`Error sending verification mail: ${err}`);
  });
}

exports.sendVerificationMail = (username, email, token) => {
  sendMail(username, email, verificationMessage(username, token));
}

exports.sendPasswordResetMail = (username, email, token) => {
  sendMail(username, email, resetPasswordMessage(username, token));
}