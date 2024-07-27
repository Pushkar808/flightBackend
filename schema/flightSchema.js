const mongoose = require('mongoose');
const flightSchema = new mongoose.Schema(
    {
        flight_id: { type: String, required: true, unique: true },
        airline: { type: String, required: true },
        status: { type: String, enum: ['ontime', 'delayed', 'cancelled'], required: true },
        departure_gate: { type: String, required: true },
        arrival_gate: { type: String, required: true },
        scheduled_departure: { type: Date, required: true },
        scheduled_arrival: { type: Date, required: true },
        actual_departure: { type: Date },
        actual_arrival: { type: Date }
    }
);

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;