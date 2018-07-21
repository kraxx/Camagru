const nodemailer = require('nodemailer');
const env = require('../config/env.js')
const hostDomain = env.HOST_DOMAIN;

const verificationMessage = (username, token) => (
`
Hello ${username}!

Thanks for registering with Camagru!

Please use the following link to verify your account:

https://${hostDomain}/verify?q=${token}

Cheers!

King Kafali a.k.a. Kafali King a.k.a. Chief Kafali
`
)

const resetPasswordMessage = (username, token) => (
`
Hello ${username}!

Please use the following link to reset your password:

https://${hostDomain}/reset_password?q=${token}

Cheers!

King Kafali a.k.a. Kafali King a.k.a. Chief Kafali
`
)

const transporter = nodemailer.createTransport({
  service: env.mail.SERVICE,
  auth: {
    user: env.mail.USER,
    pass: env.mail.PASS
  }
});

exports.sendVerificationMail = (username, email, token) => {

  const mailOptions = {
    from: 'Camagru App',
    to: email,
    subject: 'Camagru - User verification',
    text: verificationMessage(username, token)
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Verification e-mail sent: ${info.response}`);
    }
  });
}

exports.sendPasswordResetMail = (username, email, token) => {

  const mailOptions = {
    from: 'Camagru App',
    to: email,
    subject: 'Camagru - Password reset',
    text: resetPasswordMessage(username, token)
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Password reset e-mail sent: ${info.response}`);
    }
  });
}