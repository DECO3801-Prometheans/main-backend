const uploadFile = require('../services/uploadS3');
const fs = require('fs');

class HomeController {
    async index(ctx) {
        ctx.body= {
            messenge: 'This is our app'
        };
    }

    /**
     * upload image to local server
     * @param {*} ctx 
     * @param {*} next 
     */
    async upload(ctx, next) {
        // Get files from ctx.request and store it in public/uploads 
        const file = ctx.request.files.file;
        ctx.state.uploading = file;
        await next();
    }

    /**
     * upload image to AWS S3
     * @param {*} ctx 
     */
    async uploadS3(ctx) {
        // get path info from ctx
        const paths = ctx.state.uploading.path.split('\\');
        // upload through functions in services
        const res = await uploadFile(
            ctx.state.uploading.path,
            paths[paths.length-1],
            ctx.state.uploading.type,
        );
        // If status is 400, it fails to upload
        if (res.status == 400) {
            console.log(res);
            ctx.throw(400, res.messenge);
        }
        // If uploads successfully, delete the local file
        fs.unlinkSync(ctx.state.uploading.path);
        ctx.body = {
            url: res.url
        };
    }
}

module.exports = new HomeController();