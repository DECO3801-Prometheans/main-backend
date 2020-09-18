const jwt =  require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/orders'});

const { secret } = require('../config');
const auth = jwt({ secret });

router.post('/', auth);

module.exports = router;