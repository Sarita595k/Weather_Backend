// Nodemailer setup
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
    },
    family: 4, // use IPv4
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