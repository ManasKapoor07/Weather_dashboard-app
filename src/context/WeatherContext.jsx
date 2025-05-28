import { createContext, useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const WeatherContext = createContext();

const fetchWeatherAPI = async (city) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  if (!res.ok) throw new Error("City not found");
  return res.json();
};

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const queryClient = useQueryClient();

  const {
    data: weatherData,
    error,
    isError,
    isLoading
  } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherAPI(city),
    enabled: !!city, 
    refetchInterval: 30000, 
    retry: false,
  });

  const fetchWeather = (newCity) => {
    setCity(newCity);
    localStorage.setItem("lastCity", newCity);
    queryClient.invalidateQueries({ queryKey: ["weather", newCity] });
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        isLoading,
        error: isError ? error.message : null,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
