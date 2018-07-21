module.exports = (sequelize, Sequelize) => {
  const PostLike = sequelize.define('post_like',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      like: {
        type: Sequelize.ENUM,
        values: ['none', 'like', 'dislike']
      },
      favorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: Sequelize.UUID,
        required: true,
        allowNull: false
      },
      postId: {
        type: Sequelize.UUID,
        required: true,
        allowNull: false
      },
    },
    {
      updatedAt: 'lastUpdate',
      createdAt: 'dateOfCreation',
      // paranoid: true // Will not be returned in queries if deleted
    }
  );

  return PostLike;
}