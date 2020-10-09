const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/types' });
const TypesController = require('../controllers/types');

const { secret } = require('../config');
const auth = jwt({ secret });

// Create type
router.post('/', auth, TypesController.create);

// Get all types
router.get('/', auth, TypesController.find);

// Get types by category
router.get('/category/:category', TypesController.findByCategory);


// Get all categories
router.get('/getAllCategory', TypesController.allCategory);

module.exports = router;