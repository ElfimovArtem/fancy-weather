import { fetchUserGeolocation } from './components/user-geolocation-handler';
import { fetchBackgroundImage } from './components/background-image-handler';
import {
  englishLanguage,
  engPattern,
  myInterval,
  searchButtonInEnglish,
  searchButtonInRussian,
  searchButtonInBelarusian,
  placeholderOnBelLang,
  placeholderOnEngLang,
  placeholderOnRusLang,
  rusPattern,
  russianLanguage,
  longitudeTitleOnEng,
  latitudeTitleOnEng,
  latitudeTitleOnRus,
  longitudeTitleOnRus,
  longitudeTitleOnBel,
  latitudeTitleOnBel,
  celsius,
  fahrenheit,
  daysOnEng,
  daysOnRus,
  daysOnBel,
  detailsEn,
  detailsRu,
  detailsBe,
  feelsLikeEn,
  feelsLikeRu,
  feelsLikeBe,
  windEn,
  windRu,
  windBe,
  humidityTextEn,
  humidityTextRu,
  humidityTextBe
} from './constants';
import { dateNow } from './components/date-handler';
import { fetchLocationCoordinates } from './components/location-coordinates-handler';
import { getWeekDay } from './components/week-day-handler';
import {
  fetchWeatherForecast,
  weatherForecastDayFirstTitle,
  weatherForecastDaySecondTitle,
  weatherForecastDayThirdTitle
} from './components/weather-forecast';
import './styles.css';

const languageContainer = document.getElementById('language-container');
const temperatureContainer = document.getElementById('temperature-container');
const searchCityInput = document.getElementById('search-city-input');
const searchCityButton = document.getElementById('search-button');
const refreshButton = document.getElementById('refresh');
const searchForm = document.getElementById('search-city-form');
const temperatureButtonC = document.querySelector('.temperature-button-c');
const temperatureButtonF = document.querySelector('.temperature-button-f');
export const feelsLikeText = document.getElementById('feels-like-text');
export const humidityText = document.getElementById('humidity-text');
export const windText = document.getElementById('wind-text');
export const details = document.getElementById('details');
export const longitudeTitle = document.getElementById('longitude-title');
export const latitudeTitle = document.getElementById('latitude-title');
export const weekDay = document.getElementById('this-week-day');
export let locationRequest;
export let selectedLanguage = sessionStorage.getItem('lang') || englishLanguage;
export let temperatureMeasuringDevice = sessionStorage.getItem('temp') || celsius;

languageContainer.addEventListener('click', (event) => {
  languageContainer.querySelectorAll('.language-button')
    .forEach(el => el.classList.remove('language-button-active'));
  event.target['classList'].add('language-button-active');
  selectedLanguage = event.target['innerHTML'].toLowerCase();
  sessionStorage.setItem('lang', selectedLanguage);
  getWeekDay();
  if (selectedLanguage === englishLanguage) {
    searchCityInput.pattern = engPattern;
    searchCityInput.placeholder = placeholderOnEngLang;
    searchCityButton.innerHTML = searchButtonInEnglish;
    latitudeTitle.innerHTML = latitudeTitleOnEng;
    longitudeTitle.innerHTML = longitudeTitleOnEng;
    weatherForecastDayFirstTitle.innerHTML = daysOnEng[weatherForecastDayFirstTitle.dataset.index];
    weatherForecastDaySecondTitle.innerHTML = daysOnEng[weatherForecastDaySecondTitle.dataset.index];
    weatherForecastDayThirdTitle.innerHTML = daysOnEng[weatherForecastDayThirdTitle.dataset.index];
    details.innerHTML = detailsEn;
    feelsLikeText.innerHTML = feelsLikeEn;
    windText.innerHTML = windEn;
    humidityText.innerHTML = humidityTextEn;
  } else if (selectedLanguage === russianLanguage) {
    searchCityInput.pattern = rusPattern;
    searchCityInput.placeholder = placeholderOnRusLang;
    searchCityButton.innerHTML = searchButtonInRussian;
    latitudeTitle.innerHTML = latitudeTitleOnRus;
    longitudeTitle.innerHTML = longitudeTitleOnRus;
    weatherForecastDayFirstTitle.innerHTML = daysOnRus[weatherForecastDayFirstTitle.dataset.index];
    weatherForecastDaySecondTitle.innerHTML = daysOnRus[weatherForecastDaySecondTitle.dataset.index];
    weatherForecastDayThirdTitle.innerHTML = daysOnRus[weatherForecastDayThirdTitle.dataset.index];
    details.innerHTML = detailsRu;
    feelsLikeText.innerHTML = feelsLikeRu;
    windText.innerHTML = windRu;
    humidityText.innerHTML = humidityTextRu;
  } else {
    searchCityInput.pattern = engPattern;
    searchCityInput.placeholder = placeholderOnBelLang;
    searchCityButton.innerHTML = searchButtonInBelarusian;
    latitudeTitle.innerHTML = latitudeTitleOnBel;
    longitudeTitle.innerHTML = longitudeTitleOnBel;
    weatherForecastDayFirstTitle.innerHTML = daysOnBel[weatherForecastDayFirstTitle.dataset.index];
    weatherForecastDaySecondTitle.innerHTML = daysOnBel[weatherForecastDaySecondTitle.dataset.index];
    weatherForecastDayThirdTitle.innerHTML = daysOnBel[weatherForecastDayThirdTitle.dataset.index];
    details.innerHTML = detailsBe;
    feelsLikeText.innerHTML = feelsLikeBe;
    windText.innerHTML = windBe;
    humidityText.innerHTML = humidityTextBe;
  }
});

temperatureContainer.addEventListener('click', (ev) => {
  temperatureContainer.querySelectorAll('.temperature-button')
    .forEach(el => el.classList.remove('temperature-button-active'));
  ev.target['classList'].add('temperature-button-active');
  temperatureMeasuringDevice = (ev.target['dataset']['unit'] === celsius) ? celsius : fahrenheit;
  sessionStorage.setItem('temp', temperatureMeasuringDevice);
});

//-----------------------------------------------------------------------------------
// получаем данные о местоположении пользователя
//-----------------------------------------------------------------------------------

fetchUserGeolocation();

//-----------------------------------------------------------------------------------
// Здесь работаем с датой и днем недели
//-----------------------------------------------------------------------------------

setInterval(() => dateNow(), myInterval);
getWeekDay();

//-----------------------------------------------------------------------------------
// получаем фото для фона, которое меняется при каждом обновлении страницы
//-----------------------------------------------------------------------------------

fetchBackgroundImage();

//-----------------------------------------------------------------------------------
// Обработаем нажатие кнопки Refresh - которая служит для смены фонового изображения
//-----------------------------------------------------------------------------------

refreshButton.addEventListener('click', () => fetchBackgroundImage());

//-----------------------------------------------------------------------------------
//  Получаем координаты по названию населённого пункта
//-----------------------------------------------------------------------------------

searchForm.addEventListener('submit', event => {
  locationRequest = searchCityInput.value;
  searchCityInput.value = '';
  fetchLocationCoordinates();
  fetchWeatherForecast(locationRequest);
  event.preventDefault();
});


//-----------------------------------------------------------------------------------
//  Проверка выбранного языка (После перезагрузки чтобы осталась активной кнопка).
//-----------------------------------------------------------------------------------

if (selectedLanguage === englishLanguage) {
  document.querySelector('.language-button__en')['classList'].add('language-button-active');
  searchCityInput.pattern = engPattern;
} else if (selectedLanguage === russianLanguage) {
  searchCityInput.pattern = rusPattern;
  document.querySelector('.language-button__ru')['classList'].add('language-button-active');
} else {
  searchCityInput.pattern = rusPattern;
  document.querySelector('.language-button__be')['classList'].add('language-button-active');
}

//-----------------------------------------------------------------------------------
//  Проверка выбранной единицы измерения (После перезагрузки чтобы осталась активной кнопка).
//-----------------------------------------------------------------------------------

if (temperatureMeasuringDevice === celsius) {
  temperatureButtonC['classList'].add('temperature-button-active');
} else if (temperatureMeasuringDevice === fahrenheit) {
  temperatureButtonF['classList'].add('temperature-button-active');
}


fetchWeatherForecast('Moscow');
