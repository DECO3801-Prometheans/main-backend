const Product = require('../models/products');
const User = require('../models/users');
const Type = require('../models/types');
const random = require('random-string');

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
                required: false,
            },
            description: {
                type: 'string',
                required: false,
            },
            forGroup: {
                type: 'boolean',
                required: true,
            }
        });
        const { type, farmer_id, forGroup } = ctx.request.body;
        const typeExisted = await Type.findOne({ name: type });
        if(!typeExisted) {
            ctx.throw(409, 'No such product types!');
        }
        const farmer = await User.findById(farmer_id);
        if(!farmer || farmer.type !== 'farmer') {
            ctx.throw(409, 'No such farmer!');
        }
        if(forGroup) {
            let group_id = random({ length: 20 });
            while(true) {
                const _product = await Product.findOne({group_id:group_id});
                if(!_product) {
                    break;
                }
                group_id = random({ length: 20 });
            }
            const product = await new Product({
                ...ctx.request.body,
                group_id: group_id
            }).save();
        } else {
            const product = await new Product(ctx.request.body).save();
        }
        ctx.body = product;
    }

    async findById(ctx) {
        const product = await Product.findById(ctx.params.id);
        if(!product) {
            ctx.throw(404, 'Product not found');
        }
        ctx.body = product;
    }

    async findByType(ctx) {
        const type = ctx.params.type;
        const typeExisted = await Type.findOne({ name: type });
        if(!typeExisted) {
            ctx.throw(409, 'No such product types!');
        }
        const products = await Product.find({ type });
        ctx.body = products;
    }
}

module.exports = new ProductsController();