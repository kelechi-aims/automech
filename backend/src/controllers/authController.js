const Mechanic = require('../models/mechanic');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
require('dotenv').config();

// Hnadle errors
const handleErrors = (err) => {
    console.log(err);
    let errors = { email: '', password: '' };

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
        //Extract data from request body
        const { email, password } = req.body;
            
        
        try {
            // Create new mechanic document
            const user = new User({ email, password, role: 'mechanic' });
            
            // Save mechanic to database
            await user.save();
            
            // Generate JWT Token
            const token = createToken(user._id);
            console.log(token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

            // Return success message
            res.status(201).json({ user: user._id, role: user.role});
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


    // Function to handle customer signup
    static async signupCustomer(req, res) {
        //Extract data from request body
        const { email, password } = req.body;
            
        
        try {
            // Create new mechanic document
            const user = new User({ email, password, role: 'customer' });
            
            // Save mechanic to database
            await user.save();
            
            // Generate JWT Token
            const token = createToken(user._id);
            console.log(token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

            // Return success message
            res.status(201).json({ user: user._id, role: user.role});
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
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('Email and password are required');
            return res.status(400).json({ message:'Email and password are required' });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                console.log('User not found');
                return res.status(400).json({ emailErr: 'This email is not registered'});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                console.log('Incorrect password');
                return res.status(401).json({ passwordErr: 'Invalid credentials '});
            }

            const token = createToken(user._id);
            console.log(token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 60 * 60 * 1000, which is 1h

            // Return success message
            res.status(200).json({ message: 'Login successful', user: user._id, role: user.role });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }

    // Google Sign-in setup
    static googleAuthMech(req, res, next) {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOne({ googleId: profile.id });
                if (user) {
                    return done(null, user);
                } else {
                    const userEmail = profile.emails[0].value;
                    const newUser = new User({
                        email: userEmail,
                        googleId: profile.id,
                        role: 'mechanic' // Set the role as needed
                    });
                    await newUser.save();
                    return done(null, newUser);
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
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
            
            if (user.role === 'mechanic') {
                res.redirect('/mechanic/dashboard'); // Redirect to dashboard or another protected route
            } else if (user.role === 'customer') {
                res.redirect('/customer/dashboard');
            } else {
                res.redirect('/')
            }
        })(req, res, next);
    }
}

module.exports = authController;