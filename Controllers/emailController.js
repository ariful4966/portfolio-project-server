require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports.mailPostController = (req, res) => {
    const { email, subject, message, name } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'ariful4966@gmail.com', // generated ethereal user
            pass: `${process.env.EMAIL_PASS}`, // generated ethereal password
        },
    });

    transporter.sendMail(
        {
            from: req.body.email, // sender address
            to: 'ariful.practice@gmail.com', // list of receivers
            subject: `✔${subject}`, // Subject line
            text: message, // plain text body,
            html: `
      <h3>Information</h3>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
      `,
        },
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    message: `${'Submit your massage successfully from '}${result.envelope.from}`,
                });
            }
        },
    );
    transporter.close();
};
