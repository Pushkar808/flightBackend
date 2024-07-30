// someFile.js (where you need to use `io`)
const { io } = require('..'); // Adjust the path to your server file
const sendMail = require("../config/nodeMailer");
const Notification = require('../schema/notificationSchema');
const { sendNotification } = require('./socket');
const { v4 } = require('uuid');
const flightStatusAction = (flightData, reqBody) => {
    const { type, flight_id, gateType, timeType, value } = reqBody;
    let notification_data = {
        title: `Change in ${type} of flight ${flight_id}`,
        flight_id: flight_id
    };
    switch (type) {
        case "gate":
            notification_data.message = `Your flight ${flight_id} is on time. ${gateType} gate: ${value}.`;
            break;
        case "time":
            notification_data.message = `Your flight ${flight_id} ${timeType} is changed. New ${timeType}: ${value}. Departure gate: ${departure_gate}.`;
            break;
        case "status":
            if (value === "delayed")
                notification_data.message = `Your flight ${flight_id} is ${value}. New departure time: ${flightData?.actual_departure ? flightData?.actual_departure : flightData?.scheduled_departure}. Departure gate: ${flightData?.departure_gate}.`;
            else if (value === "cancelled")
                notification_data.message = `Your flight ${flight_id} is ${value}.`;
            else
                notification_data.message = `Your flight ${flight_id} is ${value}. ${gateType} gate: ${flightData?.departure_gate}.`;
            break;
        default:
            throw new Error("Invalid Type");
    }

    let notiData = [];
    const uuid = v4();
    notiData.push({ ...notification_data, method: "Email", recipient: "pushkargupta808@gmail.com", timestamp: new Date(), notification_id: uuid })
    notiData.push({ ...notification_data, method: "SMS", recipient: "9876543210", timestamp: new Date(), notification_id: uuid })
    notiData.push({ ...notification_data, method: "App", recipient: "testApp_10001", timestamp: new Date(), notification_id: uuid })
    if (notiData?.length !== 0)
        Notification.insertMany(notiData)

    notiData.map((data) => {
        if (data?.method === "Email")
            sendMail(data?.recipient, data?.title, data?.message)
        // else if (data?.method === "SMS")
        else if (data?.method === "App")
            sendNotification({ ...data, status: true })
    })
    // sendMail("pushkargupta624@gmail.com", notification_data?.title, notification_data?.message);
    // sendNotification(notification_data)
}

module.exports = {
    flightStatusAction
}
