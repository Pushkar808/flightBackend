// someFile.js (where you need to use `io`)
const { io } = require('..'); // Adjust the path to your server file
const sendMail = require("../config/nodeMailer");
const { sendNotification } = require('./socket');

const flightStatusAction = (flightData, reqBody) => {
    const { type, flight_id, gateType, timeType, value } = reqBody;
    let notification_data = {
        subject: `Change in ${type} of flight ${flight_id}`
    };
    switch (type) {
        case "gate":
            notification_data.messageBody = `Your flight ${flight_id} is on time. ${gateType} gate: ${value}.`;
            break;
        case "time":
            notification_data.messageBody = `Your flight ${flight_id} ${timeType} is changed. New ${timeType}: ${value}. Departure gate: ${departure_gate}.`;
            break;
        case "status":
            if (value === "delayed")
                notification_data.messageBody = `Your flight ${flight_id} is ${value}. New departure time: ${flightData?.actual_departure ? flightData?.actual_departure : flightData?.scheduled_departure}. Departure gate: ${flightData?.departure_gate}.`;
            else if (value === "cancelled")
                notification_data.messageBody = `Your flight ${flight_id} is ${value}.`;
            else
                notification_data.messageBody = `Your flight ${flight_id} is ${value}. ${gateType} gate: ${flightData?.departure_gate}.`;
            break;
        default:
            throw new Error("Invalid Type");
    }
    sendMail("pushkargupta624@gmail.com", notification_data?.subject, notification_data?.messageBody);
    // io.emit('notification', notification_data);
    sendNotification("KKKK")
}

module.exports = {
    flightStatusAction
}
