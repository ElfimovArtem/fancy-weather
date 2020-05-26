import { city } from './user-geolocation-handler';
import { selectedLanguage } from '../main';
import { belorussianLanguage, russianLanguage } from '../constants';

export const translateCityOnRus = (requestCity) => {
  const rusUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${requestCity}&lang=en-ru`;
  fetch(rusUrl)
    .then((resp) => resp.json())
    .then(cityRusTranslateData => {
      city.dataset.cityRu = cityRusTranslateData['text'][0];
      if (selectedLanguage === russianLanguage) {
        city.innerHTML = cityRusTranslateData['text'][0];
      }
    });
};

export const translateCityOnBel = (requestCity) => {
  const belUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${requestCity}&lang=en-be`;
  fetch(belUrl)
    .then((resp) => resp.json())
    .then(cityBelTranslateData => {
      city.dataset.cityBe = cityBelTranslateData['text'][0];
      if (selectedLanguage === belorussianLanguage) {
        city.innerHTML = cityBelTranslateData['text'][0];
      }
    });
};
