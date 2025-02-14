require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL?.trim(); // Trim to remove unwanted spaces

console.log("[DEBUG] Loaded API_URL:", API_URL);

if (!API_URL) {
    console.error("[ERROR] API_URL is not defined! Check your .env file.");
    process.exit(1); // Stop execution
}

app.use(cors());
app.use(express.json());

// API Endpoint: Convert Currency
app.get("/convert", async (req, res) => {
    try {
        const { from, to, amount } = req.query;

        console.log(`[REQUEST] Convert ${amount} ${from} to ${to}`);

        if (!from || !to || !amount) {
            console.warn("[WARNING] Missing query parameters:", { from, to, amount });
            return res.status(400).json({ error: "Missing required query parameters: 'from', 'to', or 'amount'." });
        }

        if (isNaN(amount) || amount <= 0) {
            console.warn("[WARNING] Invalid amount:", amount);
            return res.status(400).json({ error: "Amount must be a positive number." });
        }

        const requestUrl = `${API_URL}/${from}`;
        console.log("[DEBUG] API Request URL:", requestUrl);

        const response = await axios.get(requestUrl);
        console.log("[INFO] API Response:", response.data);

        const rates = response.data.conversion_rates;

        if (!rates || !rates[to]) {
            console.error("[ERROR] Invalid currency code:", to);
            return res.status(400).json({ error: `Invalid currency code: ${to}.` });
        }

        const convertedAmount = (amount * rates[to]).toFixed(2);

        console.log(`[SUCCESS] Converted ${amount} ${from} to ${convertedAmount} ${to} (Rate: ${rates[to]})`);

        res.json({
            from,
            to,
            amount,
            convertedAmount,
            rate: rates[to],
        });

    } catch (error) {
        console.error("[ERROR] Failed to fetch exchange rate:", error.stack);
        res.status(500).json({ error: "Failed to fetch conversion rate. Please try again later." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`[SERVER] Running on http://localhost:${PORT}`);
});

//