import { celsius, fahrenheit } from '../constants';
import { temperatureMeasuringDevice } from '../main';
import { forecastWeekDay, forecastWeekDayIndex } from './forecast-week-day-handler';

export const weatherTodayText = document.getElementById('weather-today-text');
const weatherTodayTemp = document.getElementById('weather-today-temp');
const weatherTodayImage = document.getElementById('weather-today-image');
const weatherTodayFeelsLike = document.getElementById('weather-today-feels-like');
const weatherTodayWind = document.getElementById('weather-today-wind');
const weatherTodayHumidity = document.getElementById('weather-today-humidity');
export const weatherForecastDayFirstTitle = document.getElementById('day-of-the-week-first-title');
export const weatherForecastDaySecondTitle = document.getElementById('day-of-the-week-second-title');
export const weatherForecastDayThirdTitle = document.getElementById('day-of-the-week-third-title');
const weatherForecastDayFirstIcon = document.getElementById('day-of-the-week-first-icon');
const weatherForecastDaySecondIcon = document.getElementById('day-of-the-week-second-icon');
const weatherForecastDayThirdIcon = document.getElementById('day-of-the-week-third-icon');
const weatherForecastDayFirstTemp = document.getElementById('day-of-the-week-first-temp');
const weatherForecastDaySecondTemp = document.getElementById('day-of-the-week-second-temp');
const weatherForecastDayThirdTemp = document.getElementById('day-of-the-week-third-temp');

export const fetchWeatherForecast = (city) => {
  const geoUrl = `https://api.weatherapi.com/v1/forecast.json?key=e5ebdd6115df4214b5b180201202005&q=${city}&days=3`;
  fetch(geoUrl)
    .then((res) => res.json())
    .then(weatherForecastData => {
      if (weatherForecastData) {
        if (weatherForecastData.current) {
          const weatherTitle = weatherForecastData.current['condition'].text;
          weatherTodayText.innerHTML = weatherTitle;
          weatherTodayText.dataset.weatherEn = weatherTitle;

          const weatherRusUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${weatherTitle}&lang=en-ru`;
          fetch(weatherRusUrl)
            .then((resp) => resp.json())
            .then(weatherRusTranslateData => {
              weatherTodayText.dataset.weatherRu = weatherRusTranslateData['text'][0];
            });

          const weatherBelUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${weatherTitle}&lang=en-be`;
          fetch(weatherBelUrl)
            .then((resp) => resp.json())
            .then(weatherBelTranslateData => {
              weatherTodayText.dataset.weatherBe = weatherBelTranslateData['text'][0];
            });

        } else {
          alert('Input Error / Ошибка ввода');
          throw new Error('Input Error / Ошибка ввода');
        }

        if (temperatureMeasuringDevice === celsius) {
          weatherTodayTemp.innerHTML = `${Math.round(weatherForecastData.current['temp_c'])}°`;
          weatherTodayFeelsLike.innerHTML = `${weatherForecastData.current['feelslike_c']}°`;
          weatherForecastDayFirstTemp.innerHTML = `${weatherForecastData['forecast']['forecastday'][0]['day']['avgtemp_c']}°`;
          weatherForecastDaySecondTemp.innerHTML = `${weatherForecastData['forecast']['forecastday'][1]['day']['avgtemp_c']}°`;
          weatherForecastDayThirdTemp.innerHTML = `${weatherForecastData['forecast']['forecastday'][2]['day']['avgtemp_c']}°`;
        } else if (temperatureMeasuringDevice === fahrenheit) {
          weatherTodayTemp.innerHTML = `${Math.round(weatherForecastData.current['temp_f'])}°`;
          weatherTodayFeelsLike.innerHTML = `${weatherForecastData.current['feelslike_f']}°`;
          weatherForecastDayFirstTemp.innerHTML = `${weatherForecastData['forecast']['forecastday'][0]['day']['avgtemp_f']}°`;
          weatherForecastDaySecondTemp.innerHTML = `${weatherForecastData['forecast']['forecastday'][1]['day']['avgtemp_f']}°`;
          weatherForecastDayThirdTemp.innerHTML = `${weatherForecastData['forecast']['forecastday'][2]['day']['avgtemp_f']}°`;
        }

        weatherTodayImage.src = `https:${weatherForecastData.current['condition'].icon}`;
        weatherTodayWind.innerHTML = `${weatherForecastData.current['wind_kph']} km/h`;
        weatherTodayHumidity.innerHTML = `${weatherForecastData.current['humidity']}%`;

        weatherForecastDayFirstTitle.innerHTML = forecastWeekDay(weatherForecastData['forecast']['forecastday'][0]['date']);
        weatherForecastDayFirstTitle.dataset['index'] = forecastWeekDayIndex(weatherForecastData['forecast']['forecastday'][0]['date']);
        weatherForecastDaySecondTitle.innerHTML = forecastWeekDay(weatherForecastData['forecast']['forecastday'][1]['date']);
        weatherForecastDaySecondTitle.dataset['index'] = forecastWeekDayIndex(weatherForecastData['forecast']['forecastday'][1]['date']);
        weatherForecastDayThirdTitle.innerHTML = forecastWeekDay(weatherForecastData['forecast']['forecastday'][2]['date']);
        weatherForecastDayThirdTitle.dataset['index'] = forecastWeekDayIndex(weatherForecastData['forecast']['forecastday'][2]['date']);

        weatherForecastDayFirstIcon.src = `https:${weatherForecastData['forecast']['forecastday'][0]['day']['condition'].icon}`;
        weatherForecastDaySecondIcon.src = `https:${weatherForecastData['forecast']['forecastday'][1]['day']['condition'].icon}`;
        weatherForecastDayThirdIcon.src = `https:${weatherForecastData['forecast']['forecastday'][2]['day']['condition'].icon}`;
      } else {
        alert('Input Error / Ошибка ввода');
        throw new Error('Input Error / Ошибка ввода');
      }

    })
};
