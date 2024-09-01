const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


/**
 * Mechanic Schema
 */
const mechanicSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please, enter an email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please, enter a valid email'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please, enter a phone number'],
        trim: true,
        minlength: [11, 'Phone number must be 11 digits'],
        validate: [validator.isMobilePhone, 'Please, enter a valid phone number'],
    },
    password: {
        type: String,
        required: [true, 'Please, enter a password'],
        minlength: [8, 'Password must be more than 8 characters'],
    },
    googleId: { type: String }, // For Google OAuth users
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
    services: { type: [String] }, // List of services offered by the mechanic
    address: { type: String },
}, { timestamps: true });

// fire a funstion before doc saves to db
mechanicSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10); // this refers to the current document before saving to the db
    next();
});

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