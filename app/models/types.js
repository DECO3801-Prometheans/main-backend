const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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