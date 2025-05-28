import { useEffect, useState } from "react";
import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiSunrise,
  WiSunset,
  WiDirectionUp,
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
} from "react-icons/wi";
import { useWeather } from "../context/WeatherContext";
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";

const WeatherDisplay = () => {
  const { weatherData } = useWeather();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [unit, setUnit] = useState("C");
  const [forecast, setForecast] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!weatherData?.name) return;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${weatherData.name}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();

        const map = {};
        data.list.forEach((entry) => {
          const date = entry.dt_txt.split(" ")[0];
          const time = entry.dt_txt.split(" ")[1];
          if (!map[date] || time === "12:00:00") {
            map[date] = entry;
          }
        });

        const daily = Object.values(map).slice(0, 5);
        setForecast(daily);
      } catch (err) {
        console.error("Forecast error:", err);
      }
    };

    fetchForecast();
  }, [weatherData]);

  if (!weatherData) return <div className="text-white">Nothing</div>;

  const {
    dt,
    timezone,
    name,
    sys: { country, sunrise, sunset },
    weather,
    main: { temp, humidity, feels_like, pressure },
    wind: { speed, deg },
  } = weatherData;

  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  const getLocalTime = (timestamp, timezoneOffsetInSeconds) => {
    const utcMillis = timestamp * 1000;
    const localMillis = utcMillis + timezoneOffsetInSeconds * 1000;
    return new Date(localMillis).toUTCString().slice(17, 22);
  };

  const getLocalDate = (timestamp, timezoneOffsetInSeconds) => {
    const utcMillis = timestamp * 1000;
    const localMillis = utcMillis + timezoneOffsetInSeconds * 1000;
    return new Date(localMillis).toUTCString().slice(0, 16);
  };

  const convertTemp = (tempC) =>
    unit === "C" ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);

  const unitSymbol = unit === "C" ? "°C" : "°F";

  const iconMap = {
    Clear: <WiDaySunny />,
    Clouds: <WiCloud />,
    Rain: <WiRain />,
    Snow: <WiSnow />,
  };

  return (
    <div className="w-full h-full p-2 text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {name}, {country}
          </h2>
          <p className="capitalize text-lg text-gray-300">
            {weather[0].description}
          </p>
        </div>
        <div className="flex items-center gap-4 bg-gray-800/60 backdrop-blur-md px-4 py-2 rounded-lg shadow-md border border-gray-700 w-fit ml-auto">
          <div className="flex items-center gap-2 text-gray-300">
            <FaRegCalendarAlt className="text-blue-400 text-base" />
            <span className="text-sm font-medium">
              {getLocalDate(dt, timezone)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-200">
            <FaClock className="text-blue-400 text-base" />
            <span className="text-sm font-semibold">
              {getLocalTime(dt, timezone)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <div className="inline-flex bg-gray-800 rounded-md shadow overflow-hidden">
          <button
            onClick={() => setUnit("C")}
            className={`px-3 py-1 text-sm font-medium transition ${
              unit === "C"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit("F")}
            className={`px-3 py-1 text-sm font-medium transition ${
              unit === "F"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            °F
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <img
          src={weatherIcon}
          alt={weather[0].description}
          className="w-28 h-28"
        />
        <div className="text-center sm:text-left">
          <p className="text-3xl font-bold text-white">
            {convertTemp(temp)}
            {unitSymbol}
          </p>
          <p className="text-lg text-gray-300">
            Feels like {convertTemp(feels_like)}
            {unitSymbol}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center mt-6">
        {[
          {
            icon: <WiHumidity />,
            value: `${humidity}%`,
            label: "Humidity",
          },
          {
            icon: <WiStrongWind />,
            value: `${speed} m/s`,
            label: "Wind Speed",
          },
          {
            icon: <WiDirectionUp />,
            value: `${deg}°`,
            label: "Wind Direction",
          },
          {
            icon: <WiBarometer />,
            value: `${pressure} hPa`,
            label: "Pressure",
          },
          {
            icon: <WiSunrise />,
            value: getLocalTime(sunrise, timezone),
            label: "Sunrise",
          },
          {
            icon: <WiSunset />,
            value: getLocalTime(sunset, timezone),
            label: "Sunset",
          },
        ].map(({ icon, value, label }, i) => (
          <div
            key={i}
            className="bg-gray-800/80 backdrop-blur-md h-28 p-2 rounded-xl shadow-lg"
          >
            <div className="text-3xl mx-auto text-blue-400">{icon}</div>
            <p className="text-xl font-semibold text-white">{value}</p>
            <p className="text-sm mt-1 text-gray-300">{label}</p>
          </div>
        ))}
      </div>

      {forecast.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 text-center sm:text-left">
            5-Day Forecast
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {forecast.map((f, i) => {
              const date = new Date(f.dt * 1000);
              const day = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const weather = f.weather[0].main;
              const icon = iconMap[weather] || <WiDaySunny />;
              const temp = convertTemp(f.main.temp);
              const description = f.weather[0].description;

              return (
                <div
                  key={i}
                  className="bg-gray-800/80 p-4 rounded-xl text-center shadow-lg flex flex-col justify-center items-center transition hover:bg-gray-700"
                >
                  <p className="text-sm text-gray-300 mb-1">{day}</p>
                  <div className="text-4xl text-blue-400 mb-1">{icon}</div>
                  <p className="text-xl font-semibold text-white">
                    {temp}
                    {unitSymbol}
                  </p>
                  <p className="text-sm text-gray-400 capitalize mt-1 text-center px-1">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
