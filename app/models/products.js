const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    __v: {
        type: Number,
        select: false,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    numeraire : {
        type: String,
        required: true,
    },
    farmer_id : {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    description: {
        type: String,
    }
});

module.exports = model('Product', ProductSchema);