## Project Overview
This is a simple **Currency Conversion API** built with Node.js and Express. It fetches real-time exchange rates from an external API and converts currencies based on user input.

## Features
- Fetches exchange rates from [ExchangeRate-API](https://www.exchangerate-api.com/)
- Converts a given amount from one currency to another
- Handles input validation and error handling
- Uses `dotenv` for environment variables

## 🛠Technologies Used
- Node.js (v20+)
- Express.js
- Axios (for API requests)
- dotenv (for environment management)
- Cors (to enable cross-origin requests)

## Installation & Setup
### 1️⃣ Clone the repository
git clone https://github.com/Abdulrahman-Hijazy/Currency-Conversion-API-Task.git
cd index.js

## Run the server
node index.ks 

### 2️⃣ Install dependencies
npm install

### 3️⃣ Set up environment variables // set your private keys
API_URL="https://v6.exchangerate-api.com/v6/your_key/latest/"
PRIVATE_KEY="your_key"
MORALIS_API_KEY="your_key"
PORT=5000

### API Endpoints
http://localhost:5000/convert?from=USD&to=EUR&amount=100

--> Response : 
{
  "from": "USD",
  "to": "EUR",
  "amount": 100,
  "convertedAmount": "95.88",
  "rate": 0.9588
}
