const Type = require('../models/types');
const { products_category } = require('../config');

class TypesController {
    async find(ctx) {
        ctx.body = await Type.find();
    }

    async create(ctx) {
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true,
            },
            category: {
                type: 'string',
                required: true,
            }
        });
        const { category } = ctx.request.body;
        if(products_category.indexOf(category) === -1) {
            ctx.throw(409, 'No such category!');
        }
        const type = await new Type(ctx.request.body).save();
        ctx.body = type;
    }

    async findByCategory(ctx) {
        const category = ctx.params.category;
    }
}

module.exports = new TypesController();