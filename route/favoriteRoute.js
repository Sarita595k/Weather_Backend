import { Router } from "express";
import { addFavoriteCity, getFavoriteCity, removeFavoriteCity } from "../controller/favoriteCity.js";
import { protect } from "../middleware/auth.js";
const router = Router()

// route :/api/favorite/
router.post("/", protect, addFavoriteCity);

// route :/api/favorite/all
router.get("/all", protect, getFavoriteCity);

// route :/api/favorite/:city
router.delete("/:city", protect, removeFavoriteCity);

export default router