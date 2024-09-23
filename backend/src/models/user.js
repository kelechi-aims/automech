const mongoose = require('mongoose');
const validator  = require('validator');
const bcrypt = require('bcryptjs');
const MUUID = require('uuid-mongodb');

const userSchema = new mongoose.Schema({
    _id: {
        type: 'object', // The _id will be stored as binary data in MongoDB
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
    },
    email: {
        type:String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please, enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please, enter a password'],
        minlength: [8, 'Password must be more than 8 characters'],
    },
    role: {
        type: String,
        enum: ['mechanic', 'customer'],
        required: true,
    },
    googleId: { type: String }, // For Google OAuth users
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next (); 
})

const User = mongoose.model('User', userSchema);
module.exports = User;