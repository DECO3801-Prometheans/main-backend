const Router = require('koa-router');
const router = new Router();
const HomeController = require('../controllers/home');

router.get('/', HomeController.index);

//Uploads images
router.post('/upload', HomeController.upload, HomeController.uploadS3);

module.exports = router;