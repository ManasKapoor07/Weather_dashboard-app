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

1.📡 Data Fetching via React Query
  1.Used React Query for efficient data fetching, caching, and background refetching of:
    a.Current weather data.
    b.5-day forecast.

2.🌍 Global State Management using Context API
  1.Created a WeatherContext to store and share weather data across components.
  2.This avoids prop drilling and centralizes data fetching and caching logic.

3.🕒 Timezone-Aware Time Handling
  1.Implemented Unix + timezone offset logic to accurately convert timestamps (e.g., sunrise, sunset, forecast times) to local time.

4.🎨 Responsive UI with Tailwind CSS
  1.Leveraged Tailwind CSS utility classes to design a clean, mobile-first layout without writing custom CSS.
  2.Created responsive grid for forecast and card-style metrics.

5.🧩 Component-Based Architecture
  1.Split UI into functional components: WeatherDisplay, ForecastGrid, LocationSearch, and WeatherContext.
  2.This promotes reusability and separation of concerns for maintainable code.

