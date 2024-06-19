const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
    },
});

const sendMail = async (email) => {

    const mail = await transporter.sendMail({
        from: '"Mail de prueba" <amilkaralan@gmail.com>',
        to: email, 
        subject: "Prueba", // Subject line
        // text: "Hello world?",
        html: "<h1>Prueba</h1>", // html body
    });

    console.log("Message sent: %s", mail);
}
module.exports = sendMail;