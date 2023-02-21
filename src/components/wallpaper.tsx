import { useState, useEffect } from "react";

import "../components/style.scss";

const ScreenSaver = () => {
  const [weather, setWeather] = useState();
  const [quote, setQuote] = useState({});

  useEffect(() => {
    getLocation();
    getQuote();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeather(latitude, longitude);
    });
  };

  const getQuote = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY2,
        "X-RapidAPI-Host": "quotes-villa.p.rapidapi.com",
      },
    };

    fetch("https://quotes-villa.p.rapidapi.com/quotes/wisdom", options)
      .then((response) => response.json())
      .then((response) => {
        const randomNum = Math.floor(Math.random() * response.length);

        setQuote(response[randomNum]);
      })
      .catch((err) => console.error(err));
    console.log(quote);
  };

  const fetchWeather = async (latitude, longitude) => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json().catch((err) => console.log(err));
    setWeather(data);
    console.log(data);
  };

  return (
    <>
      <h1>
        Mr. <span>&</span> Mrs. Tropisado
      </h1>

      <div className="quote-container">
        <h2>{quote.text && quote.text}</h2>
        <p>{quote.author}</p>
      </div>

      <div className="clock">
        <div className="hour"></div>
        <div className="min"></div>
        <div className="sec"></div>
        <div className="center"></div>
      </div>
    </>
  );
};

export default ScreenSaver;
