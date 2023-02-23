import { useState, useEffect } from "react";

import "../components/style.scss";

const ScreenSaver = () => {
  interface forecast {
    img: string;
    temp: string;
    type: string;
  }
  const [weather, setWeather] = useState<forecast>({
    img: "string",
    temp: "string",
    type: "string",
  });
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });

  interface Time {
    hr: number;
    min: number;
    sec: number;
  }
  const [timeNow, setTimeNow] = useState<Time>({ hr: 0, min: 0, sec: 0 });

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
  };

  const fetchWeather = async (latitude: number, longitude: number) => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json().catch((err) => console.log(err));
    setWeather({
      img: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temp: data.main.temp,
      type: data.weather[0].main,
    });
    console.log(data);
  };

  const getTime = () => {
    const time = new Date();
    const hour = (time.getHours() / 12) * 360;
    const mins = (time.getMinutes() / 60) * 360;
    const secs = time.getSeconds() * 6;

    setTimeNow({
      hr: hour,
      min: mins,
      sec: secs,
    });
  };
  setTimeout(() => {
    getTime();
  }, 1000);

  return (
    <div style={{ backgroundImage: "url(../img/wedding.jpg)" }}>
      <h1>
        Mr. <span>&</span> Mrs. Tropisado
      </h1>

      <div className="quote-container">
        <h2>{quote.text && quote.text}</h2>
        <p>- {quote.author} -</p>
      </div>

      <div className="weather-container">
        <p className="type">{weather.type}</p>
        <img src={weather.img} />

        <p>
          {weather.temp}
          <sup>℃</sup>
        </p>
      </div>

      <div className="time-container">
        <div className="clock">
          <div className="hands">
            <div className="hour" style={{ rotate: `${timeNow.hr}deg` }}></div>
            <div className="min" style={{ rotate: `${timeNow.min}deg` }}></div>
            <div className="sec" style={{ rotate: `${timeNow.sec}deg` }}></div>
          </div>

          <div className="twelve time">12</div>
          <div className="three time">3</div>
          <div className="six time">6</div>
          <div className="nine time">9</div>
        </div>
      </div>
    </div>
  );
};

export default ScreenSaver;
