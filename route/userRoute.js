import { Router } from "express"
import { dashboard, loginUser, signUpUser } from "../controller/userController.js"
import { protect } from "../middleware/auth.js"
import { limiter } from "../middleware/rateLimiter.js"
import { forgotPassword, resetPasswordLink } from "../controller/passwordReset.js"

const routes = Router()

// route is /api/user/signup
routes.post("/signup", signUpUser)

// route for login /api/user/login
routes.post("/login", limiter, loginUser)

// dashboard access /api/user/dashboard
routes.get("/dashboard", protect, dashboard)

// route for access /api/user/forgot-password
routes.post("/forgot-password", forgotPassword)

// route for access /api/user/reset-password/:token
routes.put("/reset-password/:token", resetPasswordLink)

export default routes