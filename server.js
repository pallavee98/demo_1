const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/sendEmail', (req, res) => {
    const { name, email, message, emailType } = req.body;

    // Create a Nodemailer transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'Gmail', 'Yahoo', etc.
        auth: {
            user: 'pallaveechaubey11@gmail.com', // Your email address
            pass: 'cegsdkncovrouoal' // Your email password
        }
    });

    // Email content
    const mailOptions = {
        from: 'your_email@example.com',
        to: emailType, // Email address based on the selected type
        subject: 'New message from ' + name,
        text: 'Message from: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
    };

    // Send email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
