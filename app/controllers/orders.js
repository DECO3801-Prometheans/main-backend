const Order = require('../models/orders');
const User = require('../models/users');

class OrdersController {
    /**
     * Create order
     * @param {*} ctx 
     */
    async create(ctx) {
        ctx.verifyParams({
            products: {
                type: 'array',
                required: true,
            },
            buyer_id: {
                type: 'string',
                required: true,
            },
            address: {
                type: 'string',
                required: true,
            },
            group_id: {
                type: 'string',
                required: false,
            },
            note: {
                type: 'string',
                required: false,
            }
        });
        const { buyer_id } = ctx.request.body;
        const buyer = await User.findById(buyer_id);
        if(!buyer) {
            ctx.throw(409, 'No such user!');
        }
        const order = await new Order(ctx.request.body).save();
        ctx.body = order;
    }

    /**
     * Find order by id
     * @param {*} ctx 
     */
    async findById(ctx) {
        const order = await Order.findById(ctx.params.id);
        if(!order) {
            ctx.throw(404, "Order not found!");
        }
        if(order.buyer_id !== id) {
            ctx.throw(403, "Your can't request this order!");
        }
        ctx.body = order;
    }

    /**
     * Check whether group id existed
     * @param {*} ctx 
     */
    async checkGroupId(ctx) {
        const order = await Order.findOne({ group_id: ctx.params.id });
        if(!order) {
            ctx.body = {
                messenge: 'group_id not existed'
            };
        } else {
            ctx.body = {
                messenge: 'grouop_id existed'
            }
        }
    }

    /**
     * Find orders by group id 
     * @param {*} ctx 
     */
    async findByGroupId(ctx) {
        const orders = await Order.find({ group_id: ctx.params.id });
        let flag = false;
        orders.forEach(order => {
            if(order.buyer_id === ctx.params.id) {
                flag = true;
            }
        });
        if(!flag) {
            ctx.throw(403, "Your can't request this order!");
        }
        ctx.body = orders;
    }
    
    /**
     * Update order
     * @param {*} ctx 
     */
    async update(ctx) {
        ctx.verifyParams({
            products: {
                type: 'array',
                required: false,
            },
            buyer_id: {
                type: 'string',
                required: false,
            },
            address: {
                type: 'string',
                required: false,
            },
            group_id: {
                type: 'string',
                required: false,
            },
            note: {
                type: 'string',
                required: false,
            }
        });
        const { buyer_id } = ctx.request.body;
        const buyer = await User.findById(buyer_id);
        if(!buyer) {
            ctx.throw(409, 'No such user!');
        }
        const order = await new Order(ctx.request.body).save();
        ctx.body = order;
    }
}

module.exports = new OrdersController();