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
        // If the we cannot find the buyer by buyer_id
        // that means there is no such user 
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
        // The post request should have a id as buyer_id in request body
        ctx.verifyParams({
            id: {
                type: 'string',
                required: true,
            }
        });
        const order = await Order.findById(ctx.params.id);
        const { id }  = ctx.request.body;
        if(!order) {
            ctx.throw(404, "Order not found!");
        }
        // If the order's buyer_id doesn't matches the id in request body
        // that means the request is invalid
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
        // Frontend use this method to check whether the group_id in order existed
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
        ctx.verifyParams({
            id: {
                type: 'string',
                required: true,
            }
        });
        // Get all orders 
        const orders = await Order.find({ group_id: ctx.params.id });
        const { id }  = ctx.request.body;
        let flag = false;
        // Make sure there is one order in all orders that has buyer_id as same
        // as the id in request body
        orders.forEach(order => {
            if(order.buyer_id === id) {
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
        // Make suer the buyer existed
        const buyer = await User.findById(buyer_id);
        if(!buyer) {
            ctx.throw(409, 'No such user!');
        }
        const order = await new Order(ctx.request.body).save();
        // Make sure the order existed 
        if(!order) {
            ctx.throw(404, 'Order not found');
        }
        ctx.body = order;
    }
}

module.exports = new OrdersController();