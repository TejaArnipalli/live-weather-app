import React, { useEffect, useState } from 'react'
import './Weather.css'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rainy-day.png'
import snow_icon from '../Assets/snowy.png'
import wind_icon from '../Assets/windy.png'

const Weather = () => {

    const weatherIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : drizzle_icon,
        "09n" : drizzle_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "11d" : rain_icon,
        "11n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon
    }
    const [weatherData, setWeatherData] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const search = async (city) => {
        if(city === "") {
          alert("Enter city name");
          return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const weatherIcon = weatherIcons[data.weather[0].icon] || clear_icon; 
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                icon: weatherIcon,
                location: data.name,
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching the error data");
        }
    }

    const handleKeyDown = (e) => {
      if(e.key == "Enter") {
        search(inputValue);
      }
    }
    

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder='Search for a city' />
      </div>
      <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" className='weather-data-icon' />
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" className='weather-data-icon' />
            <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
