import { weatherTodayText } from './weather-forecast';
import { selectedLanguage } from '../main';
import { belorussianLanguage, russianLanguage } from '../constants';

export const translateWeatherTitles = (thisTitle) => {
  const weatherRusUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${thisTitle}&lang=en-ru`;
  fetch(weatherRusUrl)
    .then((resp) => resp.json())
    .then(weatherRusTranslateData => {
      weatherTodayText.dataset.weatherRu = weatherRusTranslateData['text'][0];
      if (selectedLanguage === russianLanguage) {
        weatherTodayText.innerHTML = weatherRusTranslateData['text'][0];
      }
    });

  const weatherBelUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${thisTitle}&lang=en-be`;
  fetch(weatherBelUrl)
    .then((resp) => resp.json())
    .then(weatherBelTranslateData => {
      weatherTodayText.dataset.weatherBe = weatherBelTranslateData['text'][0];
      if (selectedLanguage === belorussianLanguage) {
        weatherTodayText.innerHTML =weatherBelTranslateData['text'][0];
      }
    });
};
