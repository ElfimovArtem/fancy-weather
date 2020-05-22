import { createMap } from './map-creator';
import {
  detailsBe,
  detailsEn,
  detailsRu,
  englishLanguage,
  feelsLikeBe,
  feelsLikeEn,
  feelsLikeRu,
  humidityTextBe,
  humidityTextEn,
  humidityTextRu,
  latitudeTitleOnBel,
  latitudeTitleOnEng,
  latitudeTitleOnRus,
  longitudeTitleOnBel,
  longitudeTitleOnEng,
  longitudeTitleOnRus,
  russianLanguage,
  windBe,
  windEn,
  windRu,
  details,
  latitudeTitle,
  longitudeTitle,
  feelsLikeText,
  windText,
  humidityText
} from '../constants';
import { selectedLanguage } from '../main';

export const city = document.getElementById('this-city');
export const latitude = document.getElementById('latitude');
export const longitude = document.getElementById('longitude');

export const fetchUserGeolocation = () => {
  const geoUrl = 'https://ipinfo.io/json?token=bcbc5d4921670a';
  fetch(geoUrl)
    .then((res) => res.json())
    .then(geoData => {
      if (geoData) {
        const local = geoData['loc'].split(',');
        const thisLatitude = Number(local[0]).toFixed(2);
        const thisLongitude = Number(local[1]).toFixed(2);

        city.innerHTML = geoData.city;
        city.dataset.cityEn = geoData.city;

        const rusUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${geoData.city}&lang=en-ru`;
        fetch(rusUrl)
          .then((resp) => resp.json())
          .then(cityRusTranslateData => {
            city.dataset.cityRu = cityRusTranslateData['text'][0];
          });

        const belUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${geoData.city}&lang=en-be`;
        fetch(belUrl)
          .then((resp) => resp.json())
          .then(cityBelTranslateData => {
            city.dataset.cityBe = cityBelTranslateData['text'][0];
          });

        if (selectedLanguage === englishLanguage) {
          latitudeTitle.innerHTML = latitudeTitleOnEng;
          longitudeTitle.innerHTML = longitudeTitleOnEng;
          details.innerHTML = detailsEn;
          feelsLikeText.innerHTML = feelsLikeEn;
          windText.innerHTML = windEn;
          humidityText.innerHTML = humidityTextEn;
        } else if (selectedLanguage === russianLanguage) {
          latitudeTitle.innerHTML = latitudeTitleOnRus;
          longitudeTitle.innerHTML = longitudeTitleOnRus;
          details.innerHTML = detailsRu;
          feelsLikeText.innerHTML = feelsLikeRu;
          windText.innerHTML = windRu;
          humidityText.innerHTML = humidityTextRu;
        } else {
          latitudeTitle.innerHTML = latitudeTitleOnBel;
          longitudeTitle.innerHTML = longitudeTitleOnBel;
          details.innerHTML = detailsBe;
          feelsLikeText.innerHTML = feelsLikeBe;
          windText.innerHTML = windBe;
          humidityText.innerHTML = humidityTextBe;
        }

        latitude.innerHTML = thisLatitude;
        longitude.innerHTML = thisLongitude;

        createMap(thisLongitude, thisLatitude);
      } else {
        alert('Ошибка при получении Вашей геопозиции / Error getting your location');
        throw new Error('Ошибка при получении Вашей геопозиции / Error getting your location');
      }

    })
};
