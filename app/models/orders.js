const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    __v: {
        type: Number,
        select: false,
    },
    time: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    products: [],
    buyer: {
        type: Object,
        required: true,
    },
});

module.exports = model('Order', ProductSchema);