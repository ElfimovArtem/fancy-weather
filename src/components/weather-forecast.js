import { celsius, fahrenheit } from '../constants';
import { temperatureMeasuringDevice } from '../main';

const weatherTodayText = document.getElementById('weather-today-text');
const weatherTodayTemp = document.getElementById('weather-today-temp');
const weatherTodayImage = document.getElementById('weather-today-image');
const weatherTodayFeelsLike = document.getElementById('weather-today-feels-like');
const weatherTodayWind = document.getElementById('weather-today-wind');
const weatherTodayHumidity = document.getElementById('weather-today-humidity');

export const fetchWeatherForecast = (city) => {
  const geoUrl = `https://api.weatherapi.com/v1/forecast.json?key=e5ebdd6115df4214b5b180201202005&q=${city}&days=4`;
  fetch(geoUrl)
    .then((res) => res.json())
    .then(weatherForecastData => {
      console.log(weatherForecastData);
      weatherTodayText.innerHTML = weatherForecastData.current['condition'].text;

      if (temperatureMeasuringDevice === celsius) {
        weatherTodayTemp.innerHTML = `${weatherForecastData.current['temp_c']}°`;
        weatherTodayFeelsLike.innerHTML = `${weatherForecastData.current['feelslike_c']}°`;
      } else if (temperatureMeasuringDevice === fahrenheit) {
        weatherTodayTemp.innerHTML = `${Math.round(weatherForecastData.current['temp_f'])}°`;
        weatherTodayFeelsLike.innerHTML = `${weatherForecastData.current['feelslike_f']}°`;
      }

      weatherTodayImage.src = weatherForecastData.current['condition'].icon;
      weatherTodayWind.innerHTML = `${weatherForecastData.current['wind_kph']} km/h`;
      weatherTodayHumidity.innerHTML = `${weatherForecastData.current['humidity']}%`;
    })
};
