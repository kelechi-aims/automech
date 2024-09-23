const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const User = require('./user');

const addressSchema = new mongoose.Schema({
    _id: {
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
    },
    user_id: {
        type: 'object',
        ref: 'User',
        required: true,
    },
    address: { type: [String] },
    city: { type: [String] },
    state: { type: [String] },
    country: { type: [String] },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;