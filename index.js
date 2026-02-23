import express from "express"
import dotenv from "dotenv"
import { connectToDb } from "./config/config.js"
import routes from "./route/userRoute.js"
import router from "./route/favoriteRoute.js"

import { limiter } from "./middleware/rateLimiter.js"
// config the dotenv file 
dotenv.config()

// creating the app
const app = express()

app.use(express.json())

// getting all user route 
app.use("/api/user", routes)

// getting favourite routes 
app.use("/api/favorite", router)

// adding functionality that no one can make more request
app.use(limiter);
// testing route 
app.get("/", (req, res) => [
    res.json({
        message: "Server is up"
    })
])

// listing at port 
app.listen(process.env.PORT || 4000, () => {
    // connect to db 
    connectToDb()
    console.log("Server is running");
})