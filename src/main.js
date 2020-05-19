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
  russianLanguage
} from './constants';
import { dateNow } from './components/date-handler';
import { fetchLocationCoordinates } from './components/location-coordinates-handler';
import { getWeekDay } from './components/week-day-handler';
import './styles.css';

const languageContainer = document.getElementById('language-container');
const temperatureContainer = document.getElementById('temperature-container');
const searchCityInput = document.getElementById('search-city-input');
const searchCityButton = document.getElementById('search-button');
const refreshButton = document.getElementById('refresh');
const searchForm = document.getElementById('search-city-form');
export const weekDay = document.getElementById('this-week-day');
export let locationRequest;
export let selectedLanguage = englishLanguage;

languageContainer.addEventListener('click', (event) => {
  languageContainer.querySelectorAll('.language-button')
    .forEach(el => el.classList.remove('language-button-active'));
  event.target['classList'].add('language-button-active');
  selectedLanguage = event.target['innerHTML'].toLowerCase();
  getWeekDay();
  if (selectedLanguage === englishLanguage) {
    searchCityInput.pattern = engPattern;
    searchCityInput.placeholder = placeholderOnEngLang;
    searchCityButton.innerHTML = searchButtonInEnglish;

  } else if (selectedLanguage === russianLanguage) {
    searchCityInput.pattern = rusPattern;
    searchCityInput.placeholder = placeholderOnRusLang;
    searchCityButton.innerHTML = searchButtonInRussian;
  } else {
    searchCityInput.pattern = engPattern;
    searchCityInput.placeholder = placeholderOnBelLang;
    searchCityButton.innerHTML = searchButtonInBelarusian;
  }
});

temperatureContainer.addEventListener('click', (ev) => {
  temperatureContainer.querySelectorAll('.temperature-button')
    .forEach(el => el.classList.remove('temperature-button-active'));
  ev.target['classList'].add('temperature-button-active');
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
  event.preventDefault();
});
