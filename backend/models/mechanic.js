const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
    firstName: {
        type: String,
        required: [true, 'Please, enter a first name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Please, enter a last name'],
        trim: true,
    },    
    password: {
        type: String,
        required: [true, 'Please, enter a password'],
        minlength: [8, 'Password must be more than 8 characters'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please, enter a phone number'],
        trim: true,
        minlength: [11, 'Phone number must be 11 digits'],
        validate: [validator.isMobilePhone, 'Please, enter a valid phone number'],
    },
    //address: {
    //    type: String,
    //    required: [true, 'Please, enter an address'],
    //    trim: true,
    //},
    profilePicture: {
        type: String, // URL to profile picture
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    workshopPicture: {
        type: String, // URL to workshop picture
        required: false,
    },
    // Add other fields as needed for additional details
}, { timestamps: true });

// fire a function before doc saved to db
mechanicSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10); // this refers to the current document before savinf to db
    next();
});

// fire a function after doc saved to db
mechanicSchema.post('save', function (doc, next) {
    console.log('New mechanic created & saved:', doc);
    next();
});

// fire a function before doc deleted from db
mechanicSchema.pre('remove', function (next) {
    console.log('Mechanic being removed:', this);
    next();
});

// fire a function after doc deleted from db
mechanicSchema.post('remove', function (doc, next) {    
    console.log('Mechanic has been removed:', doc);
    next();
});

const Mechanic = mongoose.model('Mechanic', mechanicSchema);

module.exports = Mechanic;