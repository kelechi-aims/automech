const Mechanic = require('../models/mechanic');
const jwt = require('jsonwebtoken');

// Hnadle errors
const handleErrors = (err) => {
    console.log(err);
    let errors = { email: '', phoneNumber: '', password: '' };

    // Duplicate error code
    if (err.code === 11000) {
        errors.email = 'Email already registered';
        return errors;
    }

    // validate errors
    if (err.message.includes('Mechanic validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }

    // Other errors (if any)
    return { general: 'Something went wrong' }; // Fallback for unknown errors
}

class mechanicController {
    // Function to get all mechanics
    static async allMechanics(req, res) {

    }

    // Function to handle mechanic profile update
    static async updateMechanicProfile(req, res) {
        try {
            // Extract updated profile data from request body
            const { firstName, lastName, profilePicture, bio, services, address } = req.body;
            const mechanicId = req.user.id;

            // Find the mechanic by id
            const mechanic = await Mechanic.findById(mechanicId);
            if (!mechanic) {
                return res.status(404).json({ message: 'Mechanic not found' });
            }

            // Update the mechanic's profile data
            mechanic.firstName = firstName || mechanic.firstName;
            mechanic.lastName = lastName || mechanic.lastName;
            mechanic.profilePicture = profilePicture || mechanic.profilePicture;
            mechanic.bio = bio || mechanic.bio;
            mechanic.services = services || mechanic.services;
            mechanic.address = address || mechanic.address;

            await mechanic.save();

            // Return success message
            res.status(200).json({ message: 'Mechanic profile updated successfully' });
        } catch (error) {
            console.error('Error in updating mechanic profile:', error);
            //console.error(err.message);
            res.status(500).json({ message: 'Internal server error while updating mechanic profile' });
        }
    }
}

module.exports = mechanicController;