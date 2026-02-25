// Nodemailer setup
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,      // TLS port
    secure: false,  // false for TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
    },
    tls: {
        rejectUnauthorized: false, // optional for testing
    },
    family: 4,       // <- important! forces IPv4
});
export const generateMailOptions = (userEmail, resetUrl) => {
    return {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Password Reset Request",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
           <p>Link expires in 1 hour.</p>`,
    };
};