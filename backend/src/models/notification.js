const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const Customer = require('./customer');
const Mechanic = require('./mechanic');
const Maintenance = require('./maintenance_record');

const notificationSchema = new mongoose.Schema({
    _id: {
        type: 'object',
        value: { type: 'Buffer' },
        default:() => MUUID.v4(),
    },
    customer_id :{
        type: 'object',
        ref: 'Customer',
        required: true,
    },
    mechanic_id: {
        type: 'object',
        ref: 'Mechanic',
        required: true,
    },
    maintenance_id: {
        type: 'object',
        ref: 'Maintenance',
        required: true,
    },
    reminder_date: { type: Date },
    status: { type: String },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;