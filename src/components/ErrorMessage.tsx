import { FiAlertTriangle } from "react-icons/fi";
import { useWeather } from "../context/WeatherContext";
import React from "react";

const ErrorMessage = () => {
  const { error } = useWeather();

  if (!error) return null;

  return (
    <div className="max-w-md w-full mb-6 px-4 py-3 bg-white border border-red-300 rounded-xl shadow-md flex items-center gap-3">
      <div className="p-2 bg-red-100 rounded-full">
        <FiAlertTriangle className="w-5 h-5 text-red-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-red-700 font-medium">{error}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
