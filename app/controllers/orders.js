const Order = require('../models/products');
const User = require('../models/users');

class OrdersController {
    async create(ctx) {
        ctx.verifyParams({
            products: {
                type: 'array',
                required: true,
            },
            buyers: {
                type: 'array',
                required: true,
            },
            type: {
                type: 'string',
                required: true,
            }
        })
    }
}

module.exports = new OrdersController();