const bcrypt = require('bcrypt');
const Mechanic = require('../models/mechanic');
const dbClient = require('../config/db');
const jwt = require('jsonwebtoken');

// Handle errors
const handleErrors = (err) => {
    let errors = { email: '', password: '', firstName: '', lastName: '', phoneNumber: '' };

    // Duplicate error code
    if (err.code === 11000) {
        errors.email = 'Email already registered';
        return errors;
    }

    // Validate errors
    if (err.message.includes('Mechanic validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, 'AutoMech_Locator_Secret', { expiresIn: '1h' });
}


class mechanicController {
    // Function to handle mechanic signup
    static async signupMechanic(req, res) {
        try {
            // Extract data from request body
            const { email, firstName, lastName, password, phoneNumber } = req.body;
                    
            // Create new mechanic document
            const newMechanic = new Mechanic({ email, firstName, lastName, password, phoneNumber });    
            
            // Save mechanic to database
            await newMechanic.save();
            const token = createToken(newMechanic._id);
            console.log(token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 60 * 60 * 1000, which is 1h
            
            // Return success message
            res.status(201).json({ newMechanic: newMechanic._id }); 
        } catch (error) {
            const err = handleErrors(error);
            console.log(err);
            res.status(400).json({ err });
        }

    }

    // Function to handle mechanic profile update
    static async updateMechanicProfile(req, res) {
        try {
            // Extract updated profile data from request body
            const { profilePicture, bio, workshopPicture } = req.body;
            const mechanicId = req.param.id; // Assuming the mechanic ID is passed as a route parameter

            // Find the mechanic by ID
            const mechanic = await Mechanic.findById(mechanicId);
            if (!mechanic) {
                return res.status(404).json({ message: 'Mechanic not found' });
            }

            // Update the mechanic's profile data
            mechanic.profilePicture = profilePicture;
            mechanic.bio = bio;
            mechanic.workshopPicture = workshopPicture;

            // Save the updated mechanic profile
            await mechanic.save();

            // Return success message
            res.status(200).json({ message: 'Mechanic profile updated successfully' }); 

        }  catch (error) {
            console.error('Error in updating mechanic profile:', error);
            res.status(500).json({ message: 'Internal server error while updating mechanic profile' });
        }   
    }
};

module.exports = mechanicController;
