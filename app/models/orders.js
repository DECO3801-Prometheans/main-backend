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
    buyer_id: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    group_id: {
        type: String,
    },
    note: {
        type: String,
    }
});

module.exports = model('Order', OrderSchema);