const Product = require('../models/products');

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
    }
}