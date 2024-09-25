

const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require('../models/userSchema');  // Adjust the path to your User model

const transporter = nodemailer.createTransport({
    host: "email-smtp.ap-south-1.amazonaws.com",
    auth: {
        user: "AKIAZ33XIBC6I232W3KC",
        pass: "BD/BxHPFDgCVEYQMs+YyQp0EEnAnO1HJmICvq7c5XmDq",
    }
});

// Function to send meeting emails
const sendMeetingEmails = async () => {
    try {
        console.log('Sending meeting emails at 9 AM');

        const users = await User.find({});
        // Iterate through users and send an email
        for (const user of users) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,


                subject: 'OTP TO LOGIN', // Subject line
                subject: 'Successful Login to Your HackersPrey Account', // Subject line

                html: `
    
                        <p>Dear User, </p>
                        <p>Greetings, </p>
                        <p>We would like to notify you that a successful login attempt has been made on your HackersPrey account. </p>
                        <p>If you have recently logged into your account, there is no need for any further action. However, if you have not initiated this login or suspect any unauthorized access, please don't hesitate to contact our support team immediately at helpdesk@hackersprey.com. Your account security is our top priority, and we are here to assist you in any way we can.</p>
                        <p>Thank you for choosing HackersPrey for your cybersecurity journey.
                         </p>
                        <p><b>Best Wishes</b></p>
    
                        <p><b>Hackersprey</b></p>
    
                        <div><img src = 'cid:unique_image_cid' style='width:800px;height:250px;'/></div>
    
                        `,
                attachments: [
                    {
                        filename: 'hackersprey.png',
                        path: './emailfooter.png',
                        cid: 'unique_image_cid', // use this to embed the image in the HTML content
                    },
                ],
            };

            // Send email
            await transporter.sendMail(mailOptions);
        }

        console.log('Emails sent successfully');
    } catch (error) {
        console.error('Error while sending emails:', error);
    }
};

// Cron job to run at 9 AM every day
const scheduleMeetingEmails = () => {
    cron.schedule('* * * * *', sendMeetingEmails);
    console.log("first cron job started")
};

module.exports = scheduleMeetingEmails;
