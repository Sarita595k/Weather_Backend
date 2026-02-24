import axios from "axios";

// route api/weather/:city
export const getWeather = async (req, res) => {
    try {
        const { city } = req.params;

        // complete url
        // https://api.openweathermap.org/data/2.5/weather?q={City}&appid={Api_Key}&units=metric
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: city,
                    appid: process.env.WEATHER_API_KEY,
                    units: "metric"
                }
            }
        );
        res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching weather",
            error: error.response?.data || error.message
        });
    }
};

export const getCurrentWeather = async (req, res) => {
    try {
        const { lat, lon } = req.query;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching weather"
        });
    }
}