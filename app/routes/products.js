const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/products'});
const UsersController = require('../controllers/users');
const ProductsController = require('../controllers/products');

const { secret } = require('../config');
const { route } = require('./users');

const auth = jwt({ secret });

router.post('/', auth);

router.get('/:id', auth);

module.exports = router;