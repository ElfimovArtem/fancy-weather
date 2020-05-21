import { celsius, fahrenheit } from '../constants';
import { temperatureMeasuringDevice } from '../main';
import { forecastWeekDay } from './forecast-week-day-handler';

const weatherTodayText = document.getElementById('weather-today-text');
const weatherTodayTemp = document.getElementById('weather-today-temp');
const weatherTodayImage = document.getElementById('weather-today-image');
const weatherTodayFeelsLike = document.getElementById('weather-today-feels-like');
const weatherTodayWind = document.getElementById('weather-today-wind');
const weatherTodayHumidity = document.getElementById('weather-today-humidity');
const weatherForecastDayFirstTitle = document.getElementById('day-of-the-week-first-title');
const weatherForecastDaySecondTitle = document.getElementById('day-of-the-week-second-title');
const weatherForecastDayThirdTitle = document.getElementById('day-of-the-week-third-title');
const weatherForecastDayFirstIcon = document.getElementById('day-of-the-week-first-icon');
const weatherForecastDaySecondIcon = document.getElementById('day-of-the-week-second-icon');
const weatherForecastDayThirdIcon = document.getElementById('day-of-the-week-third-icon');

export const fetchWeatherForecast = (city) => {
  const geoUrl = `https://api.weatherapi.com/v1/forecast.json?key=e5ebdd6115df4214b5b180201202005&q=${city}&days=3`;
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

      weatherTodayImage.src = `https:${weatherForecastData.current['condition'].icon}`;
      weatherTodayWind.innerHTML = `${weatherForecastData.current['wind_kph']} km/h`;
      weatherTodayHumidity.innerHTML = `${weatherForecastData.current['humidity']}%`;

      weatherForecastDayFirstTitle.innerHTML = forecastWeekDay(weatherForecastData['forecast']['forecastday'][0]['date']);
      weatherForecastDaySecondTitle.innerHTML = forecastWeekDay(weatherForecastData['forecast']['forecastday'][1]['date']);
      weatherForecastDayThirdTitle.innerHTML = forecastWeekDay(weatherForecastData['forecast']['forecastday'][2]['date']);

      weatherForecastDayFirstIcon.src = `https:${weatherForecastData['forecast']['forecastday'][0]['day']['condition'].icon}`;
      weatherForecastDaySecondIcon.src = `https:${weatherForecastData['forecast']['forecastday'][1]['day']['condition'].icon}`;
      weatherForecastDayThirdIcon.src = `https:${weatherForecastData['forecast']['forecastday'][2]['day']['condition'].icon}`;
    })
};
