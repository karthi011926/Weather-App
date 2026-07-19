const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());

// Search by city
app.get("/weather", async (req, res) => {
    try {
        const { city } = req.query;

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
        );

        res.json(response.data);

    } 
    catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
        error: "Unable to fetch weather."
    });
}
});

// Search by location
app.get("/weather/location", async (req, res) => {
    try {
        const { lat, lon } = req.query;

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            error: "Unable to fetch weather."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});