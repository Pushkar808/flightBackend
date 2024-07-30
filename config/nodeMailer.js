const nodemailer = require('nodemailer');
const sendMail = (receiverMail, mailSubject, htmlBody) => {
    try {
        //SMTP transporter for sending mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_MAIL,
                pass: process.env.APP_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.MAILER_MAIL,
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