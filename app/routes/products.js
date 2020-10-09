const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/products'});
const UsersController = require('../controllers/users');
const ProductsController = require('../controllers/products');

const { secret } = require('../config');
const auth = jwt({ secret });

// Create product 
router.post('/', auth, ProductsController.create);

// Get product by id
router.get('/:id', auth, ProductsController.findById);

// get product by type
router.get('/type/:type', ProductsController.findByType);

module.exports = router;