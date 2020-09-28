const jwt =  require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/orders'});

const OrdersController = require('../controllers/orders');

const { secret } = require('../config');
const auth = jwt({ secret });

router.post('/', auth, OrdersController.create);

router.post('/:id', auth, OrdersController.findById);

router.post('/checkGroupID/:id', auth, OrdersController.checkGroupId);

router.post('/groupID/:id', auth, OrdersController.findByGroupId);

router.patch('/:id', auth, OrdersController.update);

module.exports = router;