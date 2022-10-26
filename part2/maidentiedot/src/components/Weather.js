import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ lat, long }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weatherData, setWeatherData] = useState();
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;

  useEffect(() => {
    axios.get(apiURL).then((response) => {
      console.log("weather promise fulfilled");
      console.log(response.data);
      setWeatherData(response.data);
    });
  }, []);

  if (weatherData === undefined) {
    return <p>Loading...</p>;
  } else {
    const temp = (weatherData.main.temp-273.15).toFixed(2); // Kelvins --> Celsius
    const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const windSpeed = weatherData.wind.speed;
    return (
      <form>
        <b>Temperature: {temp} C&deg;</b> 
        <br />
        <img src={icon} alt="Loading..." />
        <br />
        <b>Wind: {windSpeed} m/s </b>
      </form>
   );
  }
};

export default Weather;