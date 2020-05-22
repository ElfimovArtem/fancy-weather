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
  weatherForecastDayThirdTitle
} from './weather-forecast';
import { selectedLanguage } from '../main';

export const selectLanguageHandler = () => {
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
};
