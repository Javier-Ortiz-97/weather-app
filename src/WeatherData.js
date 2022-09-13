import React, { useState } from "react";
import axios from "axios";
import $ from "jquery";

const WeatherData = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=87f15d62962a69a117eb9f2b54ef24d5`;

  const getData = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          updateBackgroundColor(res);
          clearErrorMessage();
        })
        .catch((err) => {
          errorMessage();
          console.log(err);
        });
      setLocation("");
    }
  };

  const updateBackgroundColor = (res) => {
    if (res.data.main.temp > "60") {
      $("body").css(
        "background-image",
        "linear-gradient(rgb(226, 79, 39), yellow, rgb(226, 79, 39))"
      );
      console.log("its warm");
    } else if (res.data.main.temp <= "60") {
      $("body").css(
        "background-image",
        "linear-gradient(rgb(53, 110, 216), lightblue, rgb(53, 110, 216))"
      );
      console.log("Its cold");
    }
  };

  const errorMessage = () => {
    $(".error-message").css("display", "block");
  };

  const clearErrorMessage = () => {
    if ($(".error-message").css("display") === "block") {
      $(".error-message").css("display", "none");
    }
    return;
  };

  return (
    <div className="weather-data-container">
      <input
        placeholder="Enter Location"
        type="text"
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={getData}
        name="location"
        value={location}
      ></input>
      <p className="error-message">* PLEASE ENTER A VALID CITY *</p>
      <div className="weather-temperature">
        {data.main ? (
          <p className="weather-data large-font">
            {data.main.temp.toFixed()}°F
          </p>
        ) : null}
        {data.main ? <p className="weather-data">{data.name}</p> : null}
      </div>
      <div className="flex-row">
        {data.main ? (
          <p className="weather-data">
            Feels like: {data.main.feels_like.toFixed()}°
          </p>
        ) : null}
        {data.main ? (
          <p className="weather-data">Humidity: {data.main.humidity}%</p>
        ) : null}
        {data.main ? (
          <p className="weather-data">Wind: {data.wind.speed.toFixed()} mph</p>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherData;
