const Mechanic = require('../models/mechanic');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

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
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

class authController {
    // Function to handle mechanic signup
    static async signupMechanic(req, res) {
        try {
            //Extract data from request body
            const { email, phoneNumber, password } = req.body;
            
            // Create new mechanic document
            const newMechanic = new Mechanic({ email, phoneNumber, password });

            // Save mechanic to database
            await newMechanic.save();
            
            // Generate JWT Token
            const token = createToken(newMechanic._id);
            console.log(token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

            // Return success message
            res.status(201).json({ newMechanic: newMechanic._id });
        } catch (error) {
            const err = handleErrors(error);
            console.log(err);

            // Check if validation errors exist, otherwise return general error
            if (err) {
                res.status(400).json({ err });
            } else {
                res.status(500).json({ msg: 'Server error' });
            }
            
        }
    }


    // Function to login a mechanic
    static async loginMechanic(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('Email and password are required');
            return res.status(400).json({ message:'Email and password are required' });
        }

        try {
            const mechanic = await Mechanic.findOne({ email });
            if (!mechanic) {
                console.log('Mechanic not found')
                return res.status(400).json({ emailErr: 'This email is not registered'});
            }

            const isPasswordValid = await bcrypt.compare(password, mechanic.password);

            if (!isPasswordValid) {
                console.log('Incorrect password');
                return res.status(401).json({ passwordErr: 'Invalid email or password '});
            }

            const token = createToken(mechanic._id);
            console.log(token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 60 * 60 * 1000, which is 1h

            // Return success message
            res.status(200).json({ message: 'Login successful', mechanic: mechanic._id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }

    // Google Sign-in setup
    static googleAuth(req, res, next) {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const mechanic = await Mechanic.findOne({ googleId: profile.id });
                
                if (mechanic) {
                    return done(null, mechanic);
                } else {
                    const newMechanic = new Mechanic({
                        email: profile.emails[0].value,
                        googleId: profile.id
                    });
                    await newMechanic.save();
                    return done(null, newMechanic);       
                }
            } catch (err) {
                return done(err, false);
            }
        }));

        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }

    // Google callback handling
    static googleCallback(req, res, next) {
        passport.authenticate('google', { failureRedirect: '/mechanic' }, (err, mechanic) => {
            if (err) {
                return next(err);
            }
            const token = createToken(mechanic._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
            res.redirect('/dashboard'); // Redirect to dashboard or another protected route
        })(req, res, next);
    }
}

module.exports = authController;