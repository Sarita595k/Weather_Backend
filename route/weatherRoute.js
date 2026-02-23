import { Router } from "express";
import { getWeather } from "../controller/weatherController.js";
const route = Router()

// route api/weather/:city
route.get("/:city", getWeather)

export default route