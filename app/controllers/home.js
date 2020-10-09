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
        const file = ctx.request.files.file;
        ctx.state.uploading = file;
        await next();
    }

    /**
     * upload image to AWS S3
     * @param {*} ctx 
     */
    async uploadS3(ctx) {
        const paths = ctx.state.uploading.path.split('\\');
        const res = await uploadFile(
            ctx.state.uploading.path,
            paths[paths.length-1],
            ctx.state.uploading.type,
        );
        if (res.status == 400) {
            console.log(res);
            ctx.throw(400, res.messenge);
        }
        fs.unlinkSync(ctx.state.uploading.path);
        ctx.body = {
            url: res.url
        };
    }
}

module.exports = new HomeController();