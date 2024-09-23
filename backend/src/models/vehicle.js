const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const Customer = require('./customer');

const vehicleSchema = new mongoose.Schema({
    _id: {
         type: 'object',
         value: { type: 'Buffer' },
         default: () => MUUID.v4(),
    },
    owner_id: {
        type: 'object',
        ref: 'Customer',
        required: true,
    },
    brand: { type: String },
    model: { type: String },
    year: { type: Number },
    vin: { type: String },
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;