import { fetchUserGeolocation, city } from './components/user-geolocation-handler';
import { fetchBackgroundImage } from './components/background-image-handler';
import {
  englishLanguage,
  myInterval,
  searchForm,
  languageContainer,
  temperatureContainer,
  refreshButton,
  searchCityInput,
  celsius,
  fahrenheit,
  temperatureButtonC,
  temperatureButtonF
} from './constants';
import { dateNow } from './components/date-handler';
import { fetchLocationCoordinates } from './components/location-coordinates-handler';
import { getWeekDay } from './components/week-day-handler';
import { fetchWeatherForecast } from './components/weather-forecast';
import { selectLanguageHandler } from './components/select-language-handler';
import './styles.css';
import './media-queries.css';
import {requestRecognition} from "./components/request-recognition";

export let locationRequest;
export let selectedLanguage = sessionStorage.getItem('lang') || englishLanguage;
export let temperatureMeasuringDevice = sessionStorage.getItem('temp') || celsius;

function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  })
}

loadData()
  .then(() => {
    let preloaderEl = document.getElementById('preloader');
    preloaderEl.classList.add('hidden');
    preloaderEl.classList.remove('visible');
  });

languageContainer.addEventListener('click', (event) => {
  languageContainer.querySelectorAll('.language-button')
    .forEach(el => el.classList.remove('language-button-active'));
  event.target['classList'].add('language-button-active');
  selectedLanguage = event.target['innerHTML'].toLowerCase();
  sessionStorage.setItem('lang', selectedLanguage);
  getWeekDay();
  selectLanguageHandler();
});

temperatureContainer.addEventListener('click', (ev) => {
  temperatureContainer.querySelectorAll('.temperature-button')
    .forEach(el => el.classList.remove('temperature-button-active'));
  ev.target['classList'].add('temperature-button-active');
  temperatureMeasuringDevice = (ev.target['dataset']['unit'] === celsius) ? celsius : fahrenheit;
  sessionStorage.setItem('temp', temperatureMeasuringDevice);
  fetchWeatherForecast(city.innerHTML);
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
selectLanguageHandler();

//-----------------------------------------------------------------------------------
//  Проверка выбранной единицы измерения (После перезагрузки чтобы осталась активной кнопка).
//-----------------------------------------------------------------------------------

if (temperatureMeasuringDevice === celsius) {
  temperatureButtonC['classList'].add('temperature-button-active');
} else if (temperatureMeasuringDevice === fahrenheit) {
  temperatureButtonF['classList'].add('temperature-button-active');
}

fetchWeatherForecast('Moscow');

//-----------------------------------------------------------------------------------
//  Распознавание речи (Запрос прогноза через голосовой обработчик).
//-----------------------------------------------------------------------------------

requestRecognition();
