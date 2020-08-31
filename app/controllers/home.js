class HomeController {
    index(ctx) {
        ctx.body= {
            messenge: 'This is our app'
        };
    }
}

module.exports = new HomeController();