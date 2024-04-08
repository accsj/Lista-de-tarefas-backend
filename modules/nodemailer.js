const nodemailer = require("nodemailer");
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
});

module.exports = transporter;