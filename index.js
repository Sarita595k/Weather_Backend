import express from "express"
import dotenv from "dotenv"
import { connectToDb } from "./config/config.js"
import routes from "./route/userRoute.js"

// config the dotenv file 
dotenv.config()

// creating the app
const app = express()

app.use(express.json())

// getting all user route 
app.use("/api/user", routes)

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