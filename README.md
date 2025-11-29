🌍 Country Form App

A responsive React (Vite) application where users can enter their details and automatically get the capital and population of any selected country.


✨ Features

🔹 1. Country Data from API

Fetches all countries from: /api/countries

Uses a proxy server in vite.config.js to fix CORS errors

🔹 2. Autocomplete Country Input

Country field uses a datalist

You can select from the dropdown or type to search

🔹 3. Automatic Capital & Population

When a country is selected, the capital and population fields update automatically

🔹 4. Loading Indicator

A loading message appears until all data is fully loaded

🔹 5. Responsive UI

The form and popup card are fully responsive and work smoothly on mobile, tablet, and desktop

🔹 6. Submitted Data Popup

When the user submits the form, a popup shows:

Name

Email

Country

Capital

Population


🧰 Tech Stack

⚛️ React (useState, useEffect)

⚡ Vite

🌐 Fetch API

🔄 Proxy server in vite.config.js

🎨 Responsive CSS


▶️ How to Run the Project
npm install
npm run dev


The app will run at:

👉 http://localhost:5173/

🔧 Proxy Setup (vite.config.js)

Used to avoid CORS issues when calling the external API.

export default defineConfig({
  server: {
    proxy: {
      "/api/countries": {
        target: "https://www.apicountries.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});


📘 How the App Works

App loads → fetches countries through proxy

Shows a loading screen until data is ready

User selects a country → capital & population auto-fill
