import './App.css';
import { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');  
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  const [error, setError] = useState(null); // State to store error messages

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();// Clear previous data
    if(city) {
    setError(null);
    setWeatherData(null);
    console.log('City:', city);
    axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=SXLBSF4QRSKDN5999FZ2KHFBQ`)

  .then(function (response) {
    console.log(response.data.days);
    setWeatherData(response.data.days); // Save weather data to state
    console.log(response.data.days);
  })
  .catch(function (error) {
    console.error(error);
    setError('Failed to fetch weather data. Please try again.');
     console.log(error);
  })
  .finally(function () {
    console.log('Wanna know more');
  });
   }
  };

  return (
    <div className="app-container">
      <div className="form-wrapper">
        <h1 className="title">🌤 Weather Analysis</h1>
        <form onSubmit={handleSubmit} className="weather-form">
          <div className="input-group">
            <label htmlFor="city" className="input-label">Enter City:</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={handleCityChange}
              className="input-field"
              placeholder="Type a city name..."
            />
          </div>
          <button type="submit" className="submit-button">Get Weather</button>
        </form>
         {weatherData && (
          <div className="weather-result">
            <h2>Weather Forecast for {city}</h2>
            <ul>
              {weatherData.slice(0, 10).map((day, index) => (
                <li key={index}>
                  <strong>{day.datetime}:</strong> {day.conditions},{day.temp}°C
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && (
          <div>{error}</div>
        )}

      </div>
    </div>
  );
};
    

export default WeatherApp;
