const nodemailer = require ("nodemailer");
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    port: 587, // port for secure SMTP
    secureConnection: false,
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'kustomssports@hotmail.com',
        pass: 'Nightchanges'
    }
});

module.exports = {transporter}