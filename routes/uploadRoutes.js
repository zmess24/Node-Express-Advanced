const 
    AWS = require('aws-sdk'),
    uuid = require('uuid/v1'),
    keys = require('../config/keys'),
    requireLogin = require('../middlewares/requireLogin'),
    { accessKeyId, secretAccessKey } = keys,
    s3 = new AWS.S3({ accessKeyId, secretAccessKey });

module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {
        // Create randomly generated id for image name under `user` folder.
        const key = `${req.user.id}/${uuid()}.jpeg`;
        s3.getSignedUrl('putObject', {
            Bucket: 'my-blog-bucket-124',
            ContentType: 'image/jpeg',
            Key: key
        }, (err, url) => res.send({ key, url }))
    });
};