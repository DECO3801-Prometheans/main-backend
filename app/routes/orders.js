const jwt =  require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/orders'});

const OrdersController = require('../controllers/orders');

const { secret } = require('../config');
const auth = jwt({ secret });

// Create order
router.post('/', auth, OrdersController.create);

// Get order by id
router.post('/:id', auth, OrdersController.findById);

// Get orders by group id
router.post('/checkGroupID/:id', auth, OrdersController.checkGroupId);

// Check whether group id exists
router.post('/groupID/:id', auth, OrdersController.findByGroupId);

// Update order by id
router.patch('/:id', auth, OrdersController.update);

module.exports = router;