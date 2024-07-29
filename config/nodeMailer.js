const nodemailer = require('nodemailer');
const sendMail = (receiverMail, mailSubject, htmlBody) => {
    try {
        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or another email service
            auth: {
                user: 'pushkargupta808@gmail.com', // your email
                pass: 'yqjr npuk ekla tzli'   // your email password or app password
            }
        });
        const mailOptions = {
            from: 'pushkargupta808@gmail.com',
            to: receiverMail,
            subject: mailSubject,
            html: htmlBody
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error(error);
    }
};
module.exports = sendMail;