const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/types' });
const TypesController = require('../controllers/types');

const { secret } = require('../config');
const auth = jwt({ secret });

router.post('/', auth, TypesController.create);

router.get('/', auth, TypesController.find);

router.get('/:category', auth, TypesController.findByCategory);

module.exports = router;