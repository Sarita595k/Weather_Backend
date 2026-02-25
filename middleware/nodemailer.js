// Nodemailer setup
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

export const generateMailOptions = (userEmail, resetUrl) => {
    return {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Password Reset Request",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
           <p>Link expires in 1 hour.</p>`,
    };
};

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()