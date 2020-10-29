const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const random = require('random-string');
const sender = require('../services/sender');
const { secret } = require('../config');

class UsersController {
    /**
     * Find all the users
     * @param {*} ctx 
     */
    async find(ctx) {
        ctx.body = await User.find();
    }

    /**
     * Find a user by id
     * @param {*} ctx 
     */
    async findById(ctx) {
        const user = await User.findById(ctx.params.id);
        if(!user) {
            ctx.throw(404, 'User not found');
        }
        ctx.body = user;
    }

    /**
     * Create a user
     * @param {*} ctx 
     */
    async create(ctx) {
        ctx.verifyParams({
            email: {
                type: 'string',
                required: true,
            },
            password: {
                type: 'string',
                required: true,
            },
            type: {
                type: 'string',
                required: true,
            },
            first_name: {
                type: 'string',
                required: false,
            },
            last_name: {
                type: 'string',
                required: false,
            },
            address: {
                type: 'string',
                required: false,
            },
            phone: {
                type: 'string',
                required: false,
            },
            abs: {
                type: 'string',
                required: false,
            },
            license: {
                type: 'string',
                required: false,
            },
            cart: {
                type: 'array',
                required: false,
            },
            credit_cards: {
                type: 'array',
                required: false,
            }
        });
        const { email, type } = ctx.request.body;
        // Make sure the type of user should be farmer or customer
        if(type !== 'farmer' && type !== 'customer') {
            ctx.throw(409, 'No such user type!');
        }
        // Make sure the email never used before
        const repeatedUser = await User.findOne({ email });
        if (repeatedUser) {
            ctx.throw(409, 'This email has already been registered!');
        }
        // Create the user in database
        const user = await new User({
            ...ctx.request.body,
            activated: false,
            verify_code: '',
        }).save();
        ctx.body = {
            id: user._id,
            messenge: 'registered successfully!',
        };
    }

    /**
     * Check whether the owner has the privilege
     * @param {*} ctx 
     * @param {*} next 
     */
    async checkOwner(ctx, next) {
        // Make sure the id in params matches the JWT
        if(ctx.params.id !== ctx.state.user._id) {
            ctx.throw(403, 'No privilege.');
        }
        // pass the middleware
        await next();
    }

    /**
     * Update a user
     * @param {*} ctx 
     */
    async update(ctx) {
        ctx.verifyParams({
            email: {
                type: 'string',
                required: false,
            },
            password: {
                type: 'string',
                required: false,
            },
            first_name: {
                type: 'string',
                required: false,
            },
            last_name: {
                type: 'string',
                required: false,
            },
            address: {
                type: 'string',
                required: false,
            },
            phone: {
                type: 'string',
                required: false,
            },
            abs: {
                type: 'string',
                required: false,
            },
            license: {
                type: 'string',
                required: false,
            },
            cart: {
                type: 'array',
                required: false,
            },
            credit_cards: {
                type: 'array',
                required: false,
            }
        });
        // Make sure the user existed in the system
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if(!user) {
            ctx.throw(404, 'User not found');
        }
        ctx.body = user;
    }

    /**
     * Delete a user
     * @param {*} ctx 
     */
    async delete(ctx) {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if(!user) {
            ctx.throw(404, 'User not found');
        }
        ctx.status = 204;
    }

    /**
     * Login
     * @param {*} ctx 
     */
    async login(ctx) {
        // Make sure the request contains email and password
        ctx.verifyParams({
            email: {
                type: 'string',
                required: true,
            },
            password: {
                type: 'string',
                required: true,
            }
        });
        const user = await User.findOne(ctx.request.body);
        // If the user find by the email and password,
        // the authentication is valid
        if(!user) {
            ctx.throw(401, 'Email or password are incorrect.');
        }
        const { _id, email } = user;
        // Create JWT by id and email and secret
        const token = jsonwebtoken.sign({ _id, email }, secret, {expiresIn: '1d'});
        ctx.body = { token, _id: _id  };
    }

    async sendEmail(ctx) {
        // Create a verify_code randomly
        const verify_code = random({ length: 16});
        // Stored the verify_code in user
        const user = await User.findByIdAndUpdate(ctx.params.id, { verify_code });
        if(!user) {
            ctx.throw(404, 'User not found');
        }
        // Send the email with the verify_code
        const result = await sender({
            email: user.email,
            code: verify_code,
        });
        ctx.body = result;
    }

    async activateUser(ctx) {
        const { email, verify_code } = ctx.request.body;
        const user = await User.findOne({email, verify_code});
        // If the user is found, that means the verify_code is correct
        if(!user) {
            ctx.throw(401, 'Email or pin are incorrect.');
        } 
        // Give the account privilege as it is activated
        const _user = await User.findByIdAndUpdate(user._id, {
            activated: true,
        });
        if(_user) {
            ctx.body = _user
        }
    }
}

module.exports = new UsersController();