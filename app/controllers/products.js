const Product = require('../models/products');
const User = require('../models/users');

class ProductsController {
    async create(ctx) {
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true,
            },
            type: {
                type: 'string',
                required: true,
            },
            price: {
                type: 'number',
                required: true,
            },
            numeraire: {
                type: 'string',
                required: true,
            },
            farmer_id: {
                type: 'string',
                required: true,
            },
            img: {
                type: 'string',
            }
        });
        const { type, farmer_id } = ctx.request.body;
    }
}

module.exports = new ProductsController();