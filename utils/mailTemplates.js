const moment = require('moment');

const htmlTemplate = (data) => {
    return `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Flight Status Update</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header img {
                max-width: 150px;
            }
            .content {
                line-height: 1.6;
            }
            .content h2 {
                color: #0056b3;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #777;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 14px;
                color: #fff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 4px;
                text-align: center;
            }
            .button:hover {
                background-color: #0056b3;
            }
            .details{
                text-transform: capitalize;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://www.goindigo.in/content/dam/indigov2/6e-website/downloadapp/Feature-Image.png" alt="Logo"/>
                <h1>Flight Status Update</h1>
            </div>
            <div class="content">
                <h2>Dear Passenger</h2>
                <p>We wanted to inform you of an important update regarding your flight.</p>
                <p class="details"><strong>Flight Number:</strong> ${data?.flight_id}</p>
                <p class="details"><strong>Flight Status:</strong> ${data?.status}</p>
                <p class="details"><strong>Flight Details:</strong></p>
                <ul>
                    <li><strong>Arrival Gate:</strong> ${data?.arrival_gate}</li>
                    <li><strong>Departure Status:</strong> ${data?.departure_gate}</li>
                    <li><strong>Arrival Time:</strong> ${moment(data?.actual_arrival ? data?.actual_arrival : data?.scheduled_arrival).format("LLLL")}</li>
                    <li><strong>Departure Time:</strong> ${moment(data?.actual_departure ? data.actual_departure : data?.scheduled_departure).format("LLLL")}</li>
                </ul>
        <p>We apologize for any inconvenience this may cause and appreciate your understanding.</p>
            </div >
        <div class="footer">
            <p>&copy; 2024 Indigo. All rights reserved.</p>
            <p>If you have any questions, please contact our customer service at serviceEmail@indigo.com.</p>
        </div>
        </div >
    </body >
    </html >

    `
}

module.exports = { htmlTemplate }