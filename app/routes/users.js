const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const UsersController = require('../controllers/users');

const { secret } = require('../config');

const auth = jwt({ secret });

router.get('/', UsersController.find);

router.post('/', UsersController.create);

router.get('/:id', UsersController.findById);

router.patch('/:id', auth, UsersController.checkOwner, UsersController.update);

router.delete('/:id', auth, UsersController.checkOwner, UsersController.delete);

router.post('/login', UsersController.login);

module.exports = router;
