const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const { secret } = require('../config');

class UsersController {
    async find(ctx) {
        ctx.body = await User.find();
    }

    async findById(ctx) {
        const user = await User.findById(ctx.params.id);
        if(!user) {
            ctx.throw(404, 'User not found');
        }
        ctx.body = user;
    }

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
            }
        });
        const { email, type } = ctx.request.body;
        if(type !== 'farmer' && type !== 'customer') {
            ctx.throw(409, 'No such user type!');
        }
        const repeatedUser = await User.findOne({ email });
        if (repeatedUser) {
            ctx.throw(409, 'This email has already been registered!');
        }
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }

    async checkOwner(ctx, next) {
        if(ctx.params.id !== ctx.state.user._id) {
            ctx.throw(403, 'No privilege.');
        }
        await next();
    }

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
            }
        });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if(!user) {
            ctx.throw(404, 'User not found');
        }
        ctx.body = user;
    }

    async delete(ctx) {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if(!user) {
            ctx.throw(404, 'User not found');
        }
        ctx.status = 204;
    }

    async login(ctx) {
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
        if(!user) {
            ctx.throw(401, 'Email or password are incorrect.');
        }
        const { _id, email } = user;
        const token = jsonwebtoken.sign({ _id, email }, secret, {expiresIn: '1d'});
        ctx.body = { token, _id: _id  };
    }
}

module.exports = new UsersController();