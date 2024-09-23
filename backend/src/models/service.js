const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const Mechanic = require('./mechanic');

const serviceSchema = new mongoose.Schema({
    _id: {
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
    },
    mechanic_id: {
        type: 'object',
        ref: 'Mechanic',
        required: true,
    },
    name: { type: String },
    description: { type: [String] },
    price: { type: Number },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;