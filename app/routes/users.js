const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const UsersController = require('../controllers/users');

const { secret } = require('../config');

const auth = jwt({ secret });

// Get all users
router.get('/', UsersController.find);

// Create a user
router.post('/', UsersController.create);

// Get a user by id
router.get('/:id', UsersController.findById);

// Update a user by id
router.patch('/:id', auth, UsersController.checkOwner, UsersController.update);

// Delete a user by id
router.delete('/:id', auth, UsersController.checkOwner, UsersController.delete);

// Login
router.post('/login', UsersController.login);

// Send Email
router.get('/sendEmail/:id', UsersController.sendEmail);

// Activate user by email
router.post('/activateEmail', UsersController.activateUser);

module.exports = router;
