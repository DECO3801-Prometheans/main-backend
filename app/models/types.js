const mongoose = require('mongoose');
const { Schema, model } = mongoose;

/**
 * The model schema for type
 */
const TypeSchema = new Schema({
    __v: {
        type: Number,
        select: false,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

module.exports = model('Type', TypeSchema);