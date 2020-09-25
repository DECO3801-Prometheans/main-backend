class HomeController {
    index(ctx) {
        ctx.body= {
            messenge: 'This is our app'
        };
    }
    upload(ctx) {
        const file = ctx.request.files.file;
        ctx.body = { path: file.path }
    }
}

module.exports = new HomeController();