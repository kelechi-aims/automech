const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Mechanic = require('../models/mechanic');
const dbClient = require('../config/db');

const createToken = (id) => {
    return jwt.sign({ id }, 'AutoMech_Locator_Secret', { expiresIn: '1h' });
}

class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('Email and password are required');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            // Find the mechanic by email
            const mechanic = await dbClient.getMechanicByEmail(email);
            if (!mechanic) {
                console.log('Mechanic not found');
                return res.status(400).json({ emailErr: 'This email is not registered' });
            }

            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, mechanic.password);
            if (!isPasswordValid) {
                console.log('Invalid password');
                return res.status(401).json({ passwordErr: 'Invalid email or password' });
            }
            const token = createToken(mechanic._id);
            // console.log(token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 60 * 60 * 1000, which is 1h
            
            // Return success message
            res.status(200).json({ message: 'Login successful', mechanic: mechanic._id });

            // Generate a JWT token
            //const token = jwt.sign(                
             //   { mechanicId: mechanic._id },
             //   'your_jwt_secret', //
           // )
        } catch (err) {
            console.log(err);
            res.status(500).json({ err });
        }
    }
}

module.exports = AuthController;
