require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dbClient = require('./config/db');
const injectRoutes = require('./routes/index');
const cookieParser  = require('cookie-parser');
const RedisStore = require('connect-redis').default;
const redisClient = require('./config/redis');
const passport = require('passport');


const app = express();

app.use(express.json()) // Parse JSON bodies from request to be use in code to a javascript object
app.use(cookieParser()) // Parse cookies from request
app.use(express.urlencoded({ extended: true })); // Parse url-encoded;
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,  // Allow credentials like cookies
}));

app.use('/api', injectRoutes()); // Inject routes

(async () => {
    // Connect to Redis client
    const redis = await redisClient();

    // Use RedisStore for session storage
    app.use(session({
        store: new RedisStore({ client: redis }), // Use Redis to store sessions
        secret: process.env.SESSION_SECRET, // Secret for signing session ID cookie
        resave: false, // Do not save session back to the store if it wasn’t modified
        saveUninitialized: false,  // Do not save uninitialized sessions
        cookie: {
            secure: false, // Set to true if using HTTPS
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
            maxAge: 1000 * 60 * 60 * 2 // Set session cookie to expire in 2 hours
        }
    }));
    console.log('Redis connected and session store initialized.');
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = app;