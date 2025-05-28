import { useState } from "react";
import { useWeather } from "../context/WeatherContext";

const SearchBar = () => {
  const { fetchWeather } = useWeather();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    fetchWeather(input.trim());
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4 mb-6 px-4"
    >
      <input
        type="text"
        placeholder="Enter city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full sm:flex-1 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
