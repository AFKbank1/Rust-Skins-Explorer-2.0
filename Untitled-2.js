require("dotenv").config();
const axios = require("axios");

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const APP_ID = 252490;

async function fetchSkinData() {
    const apiUrl = `https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v1/?key=${STEAM_API_KEY}&appid=${APP_ID}`;
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching skin data:", error);
    }
}

fetchSkinData();
