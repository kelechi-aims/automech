const mongoose = require('mongoose');
const Mechanic = require('./mechanic');
const Customer = require('./customer');
const MUUID = require('uuid-mongodb');

const reviewSchema = new mongoose.Schema({
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
    rating: { type: Number },
    review: { type: [String] },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;