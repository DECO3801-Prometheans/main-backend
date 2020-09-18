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
    },
    products: [],
    buyers: [],
    type: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    }
});

module.exports = model('Order', ProductSchema);