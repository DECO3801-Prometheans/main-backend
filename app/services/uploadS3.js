const fs = require('fs');
const AWS = require('aws-sdk');
const { s3_id, s3_secret } = require('../environment');

const ID = s3_id;
const SECRET = s3_secret;

const BUCKET_NAME = 'deco3801-bucket';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});

const uploadFile = (fileName, name, type) => {
    const fileContent = fs.readFileSync(fileName);

    const params = {
        Bucket: BUCKET_NAME,
        Key: `public/${name}`,
        Body: fileContent,
        ContentType: `image/${type}`
    };

    return  new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if(err) {
                reject({
                    status: 400,
                    message: 'Unable to upload!',
                    stack: err.stack
                });
            }
            resolve({
                status: 200,
                url: data.Location
            });
        });
    });
}

module.exports = uploadFile;