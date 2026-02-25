import { UserDetails } from "../models/User.js";
import { generateMailOptions, transporter } from "../middleware/nodemailer.js";


export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await UserDetails.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = Math.random().toString(36).substring(2, 15);
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 36000; // 1 hour
    await user.save();

    const resetUrl = `https://avsarweather.netlify.app/reset-password/${token}`;

    const mailOptions = generateMailOptions(user.email, resetUrl);

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Email could not be sent" });
        }
        res.status(200).json({ message: "Password reset email sent" });
    });
}
// PUT /api/user/reset-password/:token
export const resetPasswordLink = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await UserDetails.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() }, // check token expiry
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Update password
    user.password = password; // in beginner version, store plain password (for learning)
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
}