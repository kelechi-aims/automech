const  mongoose = require("mongoose");
const MUUID = require('uuid-mongodb');
const Vehicle = require('./vehicle');
const Mechanic = require('./mechanic');

const maintenanceSchema = new mongoose.Schema({
    _id: {
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
    },
    vehicle_id: {
        type: 'object',
        ref: 'Vehicle',
        required: true,
    },
    mechanic_id: {
        type: 'object',
        ref: 'Mechanic',
        required: true,
    },
    maintenance_name: { type: [String] },
    service_description: { type: [String] },
    cost: { type: Number },
    next_service_date: { type: Date },
}, { timestamps: true });

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
module.exports = Maintenance;