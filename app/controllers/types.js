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
        const { category, name } = ctx.request.body;
        if(products_category.indexOf(category) === -1) {
            ctx.throw(409, 'No such category!');
        }
        const repeatedType = await Type.findOne({ name });
        if(repeatedType) {
            ctx.throw(409, 'This type has already been added!');
        }
        const type = await new Type(ctx.request.body).save();
        ctx.body = type;
    }

    async findByCategory(ctx) {
        const category = ctx.params.category;
        if(products_category.indexOf(category) === -1) {
            ctx.throw(409, 'No such category!');
        }
        const types = await Type.find({category: category});
        ctx.body = types;
    }

    async allCategory(ctx) {
        ctx.body = products_category;
    }
}

module.exports = new TypesController();