import Skeleton from "./components/Skeleton.jsx";
import ErrorMessage from "./components/ErrorMessage.js";
import SearchBar from "./components/SearchBar.jsx";
import WeatherDisplay from "./components/WeatherDisplay.jsx";
import { useWeather } from "./context/WeatherContext.jsx";

const App = () => {
  const { error, weatherData, isLoading } = useWeather();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-6 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100">
      <h1 className="text-4xl font-bold mb-5 text-blue-400 drop-shadow-md">
        🌤️ Weather Dashboard
      </h1>

      <div className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-700">
        <SearchBar />

        {error && (
          <div className="text-red-400 mt-4">
            <ErrorMessage />
          </div>
        )}

        {isLoading ? (
          <div className="mt-6 space-y-4">
            <Skeleton className="h-8 w-40 rounded bg-gray-700 animate-pulse" />
            <Skeleton className="h-20 w-full rounded bg-gray-700 animate-pulse" />
            <Skeleton className="h-6 w-3/4 rounded bg-gray-700 animate-pulse" />
          </div>
        ) : (
          weatherData && (
            <div className="mt-6">
              <WeatherDisplay />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;
