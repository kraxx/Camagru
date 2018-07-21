const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  env.db.database,
  env.db.username,
  env.db.password,
  {
    storage: env.db.database,
    host: `${process.env.NODE_ENV === 'production' ? '/cloudsql/' + env.db.host : env.db.host}`,
    dialect: env.db.dialect,
    pool: env.db.pool,
    operatorsAliases: false,
    logging: false, // disables console output
    dialectOptions: {
      socketPath: `/cloudsql/${env.db.host}`
    }
  }
);

const tables = {
  User: 'user',
  Post: 'post',
  Comment: 'comment',
  PostLike: 'post_like',
  CommentLike: 'comment_like'
}

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize
};

for (let key in tables) {
  db[key] = require(`../model/${tables[key]}.model.js`)(sequelize, Sequelize);
}

db.User.hasMany(db.Post, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true
});
db.User.hasMany(db.PostLike, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true
});
db.User.hasMany(db.Comment, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true
});
db.User.hasMany(db.CommentLike, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true
});

db.Post.hasMany(db.Comment, {
  as: 'Comment',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true
});
db.Post.hasMany(db.PostLike, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true
});
db.Post.belongsTo(db.User);

db.Comment.hasMany(db.CommentLike, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true
});
db.Comment.belongsTo(db.User);
db.Comment.belongsTo(db.Post);

db.PostLike.belongsTo(db.User);
db.PostLike.belongsTo(db.Post);

db.CommentLike.belongsTo(db.User);
db.CommentLike.belongsTo(db.Comment);

module.exports = db;