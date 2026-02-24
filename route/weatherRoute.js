import { Router } from "express";
import { getCurrentWeather, getWeather } from "../controller/weatherController.js";
const route = Router()

// getting user current location 
route.get("/current", getCurrentWeather)

// route api/weather/:city
route.get("/:city", getWeather)
export default route