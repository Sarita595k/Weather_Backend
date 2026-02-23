import { Router } from "express"
import { dashboard, loginUser, signUpUser } from "../controller/userController.js"
import { protect } from "../middleware/auth.js"

const routes = Router()

// route is /api/user/signup
routes.post("/signup", signUpUser)

// route for login /api/user/login
routes.post("/login", loginUser)

// dashboard access /api/user/dashboard
routes.get("/dashboard", protect, dashboard)
export default routes