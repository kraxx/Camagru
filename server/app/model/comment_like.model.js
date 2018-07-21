module.exports = (sequelize, Sequelize) => {
  const CommentLike = sequelize.define('comment_like',
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
      userId: {
        type: Sequelize.UUID,
        required: true,
        allowNull: false
      },
      commentId: {
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

  return CommentLike;
}