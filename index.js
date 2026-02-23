import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json())

app.get("/", (req, res) => [
    res.json({
        message: "Server is up"
    })
])

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is running");
})