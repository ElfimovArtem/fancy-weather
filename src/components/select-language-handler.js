import {
  daysOnBel,
  daysOnEng,
  daysOnRus, detailsBe,
  detailsEn,
  detailsRu,
  englishLanguage,
  engPattern, feelsLikeBe,
  feelsLikeEn,
  feelsLikeRu, humidityTextBe,
  humidityTextEn,
  humidityTextRu,
  latitudeTitleOnBel,
  latitudeTitleOnEng,
  latitudeTitleOnRus,
  longitudeTitleOnBel,
  longitudeTitleOnEng,
  longitudeTitleOnRus,
  placeholderOnBelLang,
  placeholderOnEngLang,
  placeholderOnRusLang,
  rusPattern,
  russianLanguage,
  searchButtonInBelarusian,
  searchButtonInEnglish,
  searchButtonInRussian,
  details,
  feelsLikeText,
  humidityText,
  latitudeTitle,
  longitudeTitle,
  windText,
  windBe,
  windEn,
  windRu,
  searchCityInput,
  searchCityButton,
} from '../constants';
import {
  weatherForecastDayFirstTitle,
  weatherForecastDaySecondTitle,
  weatherForecastDayThirdTitle,
  weatherTodayText
} from './weather-forecast';
import { selectedLanguage } from '../main';
import { city } from './user-geolocation-handler';

export const selectLanguageHandler = () => {
  if (selectedLanguage === englishLanguage) {
    document.querySelector('.language-button__en')['classList'].add('language-button-active');
    city.innerHTML = city.dataset['cityEn'];
    weatherTodayText.innerHTML = weatherTodayText.dataset['weatherEn'];
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
    document.querySelector('.language-button__ru')['classList'].add('language-button-active');
    city.innerHTML = city.dataset['cityRu'];
    weatherTodayText.innerHTML = weatherTodayText.dataset['weatherRu'];
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
    document.querySelector('.language-button__be')['classList'].add('language-button-active');
    city.innerHTML = city.dataset['cityBe'];
    weatherTodayText.innerHTML = weatherTodayText.dataset['weatherBe'];
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
};
