const ctrl = {};
const nodeMailer = require('nodemailer');

ctrl.index = async (req, res) => {

    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.email",
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'jehisondeveloper@gmail.com', // generated ethereal user
            pass: 'rixqzheafqynmjbl', // generated ethereal password 
        },
    });

    const mailOptions = {
        from: req.body.email,
        to: "jehison3098@gmail.com",
        subject: `Message from ${req.body.name}`,
        html: `
            <p>
                Nombre: ${req.body.name}<br>
                Correo: ${req.body.email}<br>
                Teléfono: ${req.body.phone}
            </p>
            <p>${req.body.message}</p>
            `,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send('error');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.status(200).send("Message sent");
        }
    });

}

module.exports = ctrl;