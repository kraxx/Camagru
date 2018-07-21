const postmw = require('../helpers/post.middleware.js');

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('post',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      description: {
        type: Sequelize.TEXT
      },
      sourceUrl: {
        type: Sequelize.STRING,
        required: true
      },
      approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      // username: {
      //   type: Sequelize.STRING,
      //   required: true,
      //   allowNull: false
      // }
    },
    {
      updatedAt: 'lastUpdate',
      createdAt: 'dateOfCreation',
      // paranoid: true // Will not be returned in queries if deleted
    
      hooks: {

        afterDestroy: (post => {
          console.log("POST after destroy called")
          return postmw.deleteImageFromDirectory(post);
        }),
        // afterBulkDestroy: (post => {
        //   console.log("BULK BULK BULK AYY WE CALLED THE DELETE HOOK WOW")
        //   return postmw.deleteImageFromDirectory(post);
        // }),
        // beforeDestroy: (post => {
        //   console.log("BEFORERERERE")
        //   return postmw.deleteImageFromDirectory(post);
        // }),
        beforeBulkDestroy: (post => {
          console.log("POST Before bulk destroy called")
          console.log("post", post)
          // return postmw.deleteImageFromDirectory(post);
        }),
      }
    }
  );


  // Post.addHook('beforeDestroy', (post => {
  //   console.log('can we get triggered pls')
  //   console.log('pst', post)
  // }))


  // Post.hook('beforeDestroy', (post => {
  //   console.log("fuck man just trigger this holy cow")
  // }))
  // // supposedly an instance hook
  // Post.afterDestroy(post => {
  //   console.log("FINALLY TRIGGERED AFTER DESTROY FOR POSTSSS")
  //   return postmw.deleteImageFromDirectory(post);
  // })  
  // Post.afterBulkDestroy(post => {
  //   console.log("FINALLY TRIGGERED BULUBUBK AFTER DESTROY FOR POSTSSS")
  //   return postmw.deleteImageFromDirectory(post);
  // })

  return Post;
}