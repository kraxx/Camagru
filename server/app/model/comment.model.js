module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comment',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      text: {
        type: Sequelize.TEXT,
        required: true
      },
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      postId: {
        type: Sequelize.UUID,
        required: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        required: true,
        allowNull: false
      }
    },
    {
      updatedAt: 'lastUpdate',
      createdAt: 'dateOfCreation',
      // paranoid: true // Will not be returned in queries if deleted
    }
  );

  return Comment;
}