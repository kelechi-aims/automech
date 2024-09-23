const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./user');
const MUUID = require('uuid-mongodb');
const Address = require('./address');
const Service = require('./service');

/**
 * Mechanic Schema
 */
const mechanicSchema = new mongoose.Schema({
    _id: {
        type: 'object', // The _id will be stored as binary data in MongoDB
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
    },
    user_id : {
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
    profilePicture: { type: String }, // url to profile picture
    bio: { type: String },
    services: {
        type: ['object'],
        ref: 'Service',
    },
    address_id: {
        type: 'object',
        ref: 'Address',
    },
}, { timestamps: true });

mechanicSchema.post('save', function (doc, next) {
    console.log('New mechanic created and saved:', doc);
    next();
});

// fire a function before doc deleted from db
mechanicSchema.post('remove', function (next) {
    console.log('Mechanic is being removed', this);
    next();
});

// fire a function after doc has been deleted from the db
mechanicSchema.post('remove', function (doc, next) {
    console.log('Mechanic has been removed:', doc);
    next();
});

const Mechanic = mongoose.model('Mechanic', mechanicSchema);

module.exports = Mechanic;