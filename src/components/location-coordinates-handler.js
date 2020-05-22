import { createMap } from './map-creator';
import { enteredRequestTranslate } from './entered-request-handler';
import { locationRequest } from '../main';
import { city, latitude, longitude } from './user-geolocation-handler';

export let cityOnRusLang;

export const fetchLocationCoordinates = () => {
  const locationURL = `https://api.opencagedata.com/geocode/v1/json?q=${locationRequest}&key=ed5e8ea04479465c8f1aa6c66c987afb&pretty=1&no_annotations=1`;
  fetch(locationURL)
    .then((res) => res.json())
    .then(locationData => {
      if (locationData.results[0]) {
        const fetchCityTitle = locationData.results[0]['components']['city'] || locationData.results[0]['components']['state'];
        city.dataset.cityRu = fetchCityTitle;

        const engTranslationUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${fetchCityTitle}&lang=ru-en`;
        fetch(engTranslationUrl)
          .then((resp) => resp.json())
          .then(wordTranslateData => {
            city.dataset.cityEn = wordTranslateData['text'][0];
          });

        const belTranslationUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${fetchCityTitle}&lang=ru-be`;
        fetch(belTranslationUrl)
          .then((resp) => resp.json())
          .then(wordTranslateData => {
            city.dataset.cityBe = wordTranslateData['text'][0];
          });

        const thisLocationLatitude = locationData.results[0]['geometry']['lat'].toFixed(2);
        const thisLocationLongitude = locationData.results[0]['geometry']['lng'].toFixed(2);

        createMap(thisLocationLongitude, thisLocationLatitude);
        latitude.innerHTML = thisLocationLatitude;
        longitude.innerHTML = thisLocationLongitude;
        cityOnRusLang = fetchCityTitle;
        enteredRequestTranslate(locationRequest);
      } else {
        throw new Error('Input Error / Ошибка ввода');
      }

    })
};
