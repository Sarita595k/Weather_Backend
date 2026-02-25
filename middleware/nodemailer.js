// nodemailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App password
    },
    family: 4, // force IPv4
});

export const generateMailOptions = (userEmail, resetUrl) => ({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
         <p>Link expires in 1 hour.</p>`
});