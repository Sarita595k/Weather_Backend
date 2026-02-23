import { UserDetails } from "../model/userModel.js";


// route :/api/favorite/
export const addFavoriteCity = async (req, res) => {
    try {
        const { city } = req.body
        if (!city) {
            return res.status(400).json({ message: "City is required" });
        }
        const cityName = city.trim().toLowerCase()

        const updateUserDetails = await UserDetails.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { favorites: cityName } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "City added to favorites",
            favorites: updateUserDetails.favorites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding favorite",
            error: error.message
        });
    }
}


// route :/api/favorite/all
export const getFavoriteCity = async (req, res) => {
    try {
        const user = await UserDetails.findById(req.user.id);

        res.status(200).json({
            success: true,
            favorites: user.favorites
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching favorites"
        });
    }
};


// route :/api/favorite/:city
export const removeFavoriteCity = async (req, res) => {
    try {
        const { city } = req.params;

        const cityName = city.trim().toLowerCase();

        const updatedUserDetails = await UserDetails.findByIdAndUpdate(
            req.user.id,
            { $pull: { favorites: cityName } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "City removed from favorites",
            favorites: updatedUserDetails.favorites
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error removing favorite"
        });
    }
};