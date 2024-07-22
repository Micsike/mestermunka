const nodemailer = require('nodemailer');

exports.sendEmail = (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: email,
        to: 'gimibo1@gmail.com',
        subject: `Üzenet ${name}-tól`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Üzenet elküldve: %s', info.messageId);
        res.redirect('/');
    });
};