const mongoose = require('mongoose');
const { Schema, model } = mongoose;

/**
 * The model schema for user
 * 
 */
const userSchema = new Schema({
    __v: {
        type: Number,
        select: false,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    type: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    abs: {
        type: String,
    },
    license: {
        type: String,
    },
    activated: {
        type: Boolean,
    },
    verify_code: {
        type: String,
        select: false,
    },
    cart: [],
});

module.exports = model('User', userSchema);