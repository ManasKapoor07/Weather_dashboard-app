A modern, responsive weather dashboard built with React, Vite, and Tailwind CSS. This application displays current weather data, including temperature, humidity, wind speed, pressure, sunrise/sunset, and a 5-day forecast. It also features real-time local time and date based on the weather location.

---

## 🚀 Live Demo

👉 [Live Demo](https://tangerine-youtiao-d6677d.netlify.app/)

---


## 🧰 Tech Stack

- **React** (via Vite) – Component-based UI
- **React Query** - To fetch data
- **Tailwind CSS** – Utility-first styling
- **OpenWeatherMap API** – Real-time weather and forecast data
- **React Context API** – Global state management
- **React Icons** – Weather and UI icons

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Weather_dashboard-app.git
cd Weather_dashboard-app

2. Install dependencies
npm install

3. Add OpenWeatherMap API key
Create a .env file in the project root and add: 
VITE_WEATHER_API_KEY=your_openweather_api_key

🔐 Note: You can obtain a free API key from https://openweathermap.org/api
4. Run the development server
npm run dev


✨ Features
1.🌍 Location-based weather with city and country

2.🕒 Real-time local time and date handling using timezone offset

3.🌡️ Temperature unit toggle (Celsius ↔ Fahrenheit)

4.📊 Weather metrics: feels like, humidity, wind, pressure

5.🌅 Sunrise and 🌇 Sunset display

6.📅 Responsive 5-day weather forecast

7.🧑‍💻 Clean UI with responsive design (mobile + desktop)



🧠 Approach

1.📡 React Query was used to efficiently fetch, cache, and manage weather API data with automatic re-fetching and error handling.

2.🌍 React Context API was used to globally share weather state across components in a scalable and clean way.

3.🕒 Accurate local time was computed using Unix timestamps combined with the provided timezone offset from the API.

4.🎨 Tailwind CSS enabled a fully responsive and modern layout without writing any custom CSS.

5.🧩 Component-based architecture helped keep the UI modular, maintainable, and easy to extend.

6.📆 5-day forecast was implemented by filtering the forecast data to retrieve one data point per day (e.g., at 12:00 PM), giving a clean and concise daily overview.
