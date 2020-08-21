const Router = require('koa-router');
const router = new Router();
const HomeController = require('../controllers/home');

router.get('/', HomeController.index);

module.exports = router;