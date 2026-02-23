import { Router } from "express"
import { dashboard, loginUser, signUpUser } from "../controller/userController.js"
import { protect } from "../middleware/auth.js"
import { limiter } from "../middleware/rateLimiter.js"

const routes = Router()

// route is /api/user/signup
routes.post("/signup", signUpUser)

// route for login /api/user/login
routes.post("/login", limiter, loginUser)

// dashboard access /api/user/dashboard
routes.get("/dashboard", protect, dashboard)
export default routes