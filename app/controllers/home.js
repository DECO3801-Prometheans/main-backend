class HomeController {
    index(ctx) {
        ctx.body= 'This is Home Page';
    }
}

module.exports = new HomeController();