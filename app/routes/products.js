const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/products'});
const UsersController = require('../controllers/users');
const ProductsController = require('../controllers/products');

const { secret } = require('../config');
const auth = jwt({ secret });

router.post('/', auth, ProductsController.create);

router.get('/:id', auth, ProductsController.findById);

router.get('/type/:type', ProductsController.findByType);

module.exports = router;