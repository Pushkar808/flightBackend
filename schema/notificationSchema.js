const mongoose = require('mongoose');
const notiSchema = new mongoose.Schema(
    {
        notification_id: { type: String, required: true },
        flight_id: { type: String, required: true },
        message: { type: String, required: true },
        title: { type: String, required: true },
        timestamp: { type: Date, required: true, default: Date.now },
        method: { type: String, required: true },
        recipient: { type: String, required: true },
    },
    {
        timestamps: true // This adds createdAt and updatedAt fields
    }
);

const Notification = mongoose.model('notificatioData', notiSchema);

module.exports = Notification;