// const fs = require('fs');
// const path = require('path');
const auth = require('../helpers/auth.js');

// Using Google Cloud Platform Storage Bucket
const Storage = require('@google-cloud/storage');
const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const stream = require('stream');
const bucketPrefix = 'https://storage.googleapis.com/'


exports.saveImageToDirectory = (req, res, next) => {

  let uuid = auth.generateUuidv4();
  let fileName = `/public/${req.id}_${uuid}.png`

  let bufferStream = new stream.PassThrough();
  bufferStream.end(new Buffer(req.body.image, 'base64'));

  let file = bucket.file(fileName);

  bufferStream.pipe(file.createWriteStream({
    metadata: {
      contentType: 'image/png',
      metadata: {
        custom: 'metadata'
      }
    },
    public: true,
    validation: 'md5'
  }))
  .on('error', (err) => {
    console.log(`Error writing image to GCS bucket: ${err}`);
    res.status(500).json({error: err});
  })
  .on('finish', () => {
    console.log('File successfully written to GCS bucket!');
    req.body.sourceUrl = `${bucketPrefix}${process.env.GCLOUD_STORAGE_BUCKET}${fileName}`;
    next();
  });

/* For writing files to local directory

  // let rootPath = path.dirname(require.main.filename || process.mainModule.filename);

  fs.writeFile(
    `${rootPath}${dest}`,
    req.body.image,
    { encoding: 'base64'},
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({error: err});
      } else {
        console.log('File created!');
        req.body.sourceUrl = `server${dest}`;
        next();
      }
    }
  );
*/
}

exports.deleteImageFromDirectory = (post) => {

  let filePath = post.sourceUrl.slice(bucketPrefix.length + process.env.GCLOUD_STORAGE_BUCKET.length + 1); // slice off the massive prefix
  let file = bucket.file(filePath);

  file.delete()
  .then(() => {
    console.log(`${filePath} successfully deleted!`);    
  })
  .catch(err => {
    console.log(`Error deleting image from GCS bucket: ${err}`);    
  });

/* For deleting files from local directory

  return fs.unlink(filePath, (err) => {
    if (err)
      throw err;
    console.log(`${filePath} successfully deleted!`);
  })
*/
}
