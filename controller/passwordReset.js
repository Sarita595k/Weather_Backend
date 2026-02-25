// userController.js
import { generateMailOptions, transporter } from "../middleware/nodemailer.js";
import { UserDetails } from "../model/userModel.js";

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserDetails.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = Math.random().toString(36).substring(2, 15);
        user.resetPasswordToken = token;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `https://avsarweather.netlify.app/reset-password/${token}`;
        const mailOptions = generateMailOptions(user.email, resetUrl);

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent" });
    } catch (err) {
        console.log("Forgot password error:", err);
        res.status(500).json({ message: "Email could not be sent" });
    }
};

export const resetPasswordLink = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await UserDetails.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = password; // store plain password for learning
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
        console.log("Reset password error:", err);
        res.status(500).json({ message: "Server error" });
    }
};