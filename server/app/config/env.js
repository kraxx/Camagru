const env = {
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // port: process.env.DB_PORT,
    pool: {
        max: 5, // max number of connections
        min: 0,
        acquire: 30000, // max time spent trying to get connection before throwing error
        idle: 10000 // max time a connection can be idle before being released
    }
  },
  HOST_DOMAIN: process.env.HOST_DOMAIN,
  jwt: {
    SECRET: process.env.JWT_SECRET,
    SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR,
    EXPIRATION_TIME: 86400 // 24 hours
  },
  mail: {
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASS,
    SERVICE: process.env.MAIL_SERVICE
  }
};

module.exports = env;