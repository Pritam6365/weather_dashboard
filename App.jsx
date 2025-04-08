import React, { useState } from 'react';
import './App.css';

const API_KEY = '2eb044e06b39eb2b3ab5d7e30cd3105e';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <h1>🌦️ Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">❌ {error}</p>}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}



