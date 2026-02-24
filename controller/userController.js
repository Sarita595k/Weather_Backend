import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserDetails } from "../model/userModel.js"

// sign up the user getting details from the user 
// route is /api/user/signup
export const signUpUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const checkEmailExists = await UserDetails.findOne({ email })

        // 🔹 Check all fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 🔹 Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // 🔹 Password strength validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain uppercase, lowercase, number, special character and be at least 6 characters long"
            });
        }
        // checking that the email exist or not 
        if (checkEmailExists) {
            return res.status(409).json({
                success: false,
                message: "Email already exist",
            })
        }
        // if email not exists 
        // hashing or bcrypt the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // creating the new user 
        const newUser = await UserDetails.create({ username, email, password: hashedPassword })

        // Generate JWT Token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET_CODE,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        // success message 
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser,
            token
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Error in creating user",
            error: err.message
        })
    }
}


// login details from the user 
// route is /api/user/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await UserDetails.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email or password Invalid.",
            })
        }

        const passwordMatched = await bcrypt.compare(password, user.password)
        if (!passwordMatched) {
            return res.status(401).json({
                success: false,
                message: "Email or password Invalid.Try again later.",
            })
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_CODE,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        // success message 
        res.status(200).json({
            success: true,
            message: "Login successfully",
            token
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in login",
            error: err.message
        })
    }
}
// dashboard created 
export const dashboard = async (req, res) => {
    console.log("Protected route accessed")
    res.json({
        message: "Hello user in your dashboard"
    })
} 
