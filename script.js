// Wait for the DOM to load before executing scripts
document.addEventListener("DOMContentLoaded", () => {
    // ================================
    // 1. DOM Elements and Variables
    // ================================
    const skinList = document.getElementById("skin-list");
    const sortOptions = document.getElementById("sort-options");
    const loginModal = document.getElementById("login-modal");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const closeModal = document.getElementById("close-modal");
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
    const currency = 2; // Default to GBP for the Steam Market API

    // Example skin data for now (can be replaced by a backend or API call)
    const skins = [
        { name: "Forest Hoodie", market_hash_name: "Forest Hoodie" },
        { name: "Desert Pants", market_hash_name: "Desert Pants" },
        { name: "Arctic Jacket", market_hash_name: "Arctic Jacket" }
    ];

    // ================================
    // 2. Steam API Integration
    // ================================
    async function fetchSkinPrice(marketHashName) {
        const apiUrl = `https://steamcommunity.com/market/priceoverview/?appid=252490&currency=${currency}&market_hash_name=${encodeURIComponent(marketHashName)}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.success) {
                return {
                    lowestPrice: data.lowest_price || "N/A",
                    volume: data.volume || "N/A",
                    medianPrice: data.median_price || "N/A"
                };
            } else {
                console.error(`Failed to fetch data for ${marketHashName}`);
                return { error: true };
            }
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
            return { error: true };
        }
    }

    // ================================
    // 3. Skin Display Functionality
    // ================================
    async function displaySkins() {
        skinList.innerHTML = ""; // Clear the current list
        for (const skin of skins) {
            const priceData = await fetchSkinPrice(skin.market_hash_name);
            const skinDiv = document.createElement("div");
            skinDiv.className = "card";
   
