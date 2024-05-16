const mongoose = require('mongoose');
/**
 * Mechanic Schema
 */
const mechanicSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },    
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
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

const Mechanic = mongoose.model('Mechanic', mechanicSchema);

module.exports = Mechanic;