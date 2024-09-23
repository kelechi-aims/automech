const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const Customer = require('./customer');
const Mechanic = require('./mechanic');
const Service = require('./service');


const bookingSchema = new mongoose.Schema({
    _id: {
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
    },
    customer_id: {
        type: 'object',
        ref: 'Customer',
        required: true,
    },
    mechanic_id: {
        type: 'object',
        ref: 'Mechanic',
        required: true, 
    },
    service_id: {
        type: 'object',
        ref: 'Service',
        required: true,
    },
    status: { type: String },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;