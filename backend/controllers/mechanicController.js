const bcrypt = require('bcrypt');
const Mechanic = require('../models/mechanic');


class mechanicController {
    // Function to handle mechanic signup
    static async signupMechanic(req, res) {
        try {
            // Extract data from request body
            const { email, firstName, lastName, password, phoneNumber } = req.body;
            
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }
            if (!firstName) {
                return res.status(400).json({ message: 'First name is required' });
            }
            if (!lastName) {
                return res.status(400).json({ message: 'Last name is required' });
            }
            if (!password) {
                return res.status(400).json({ message: 'Password is required' });
            }
            if (!phoneNumber) {
                return res.status(400).json({ message: 'Phone number is required' });
            }

            // Check if mechanic with the same email already exists
            const existingMechanic = await Mechanic.findOne({ email });
            if (existingMechanic) {
                return res.status(400).json({ message: 'Mechanic already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new mechanic document
            const newMechanic = new Mechanic({ email, firstName, lastName, password: hashedPassword, phoneNumber });    
            
            // Save mechanic to database
            await newMechanic.save();

            // Return success message
            res.status(201).json({ message: 'Mechanic signup successfully' }); 
        } catch (error) {
            console.error('Error in mechanic signup:', error);
            res.status(500).json({ message: 'Internal server error while signing up mechanic' });
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
