const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const User = require('./user');
const validator = require('validator');
const Address = require('./address');

const customerSchema = new mongoose.Schema({
    _id: {
        type: 'object', // The _id will be stored as binary data in MongoDB
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
    },
    user_id: {
        type: 'object', // References the _id of the User schema
        ref: 'User',
        required: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        minlength: [11, 'Phone number must be 11 digits'],
        validate: [
            {
                validator: (value) => validator.isMobilePhone(value, 'en-NG'),  // Adjust locale as needed
                message: 'Please, enter a valid Nigerian phone number',
            },
        ],
    },
    firstName : {
        type: String,
        trim: true,
    },
    lastName : {
        type: String,
        trim: true,
    },
    address_id: {
        type: 'object',
        ref: 'Address',
    },
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;