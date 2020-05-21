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
} from '../constants';
import { details, selectedLanguage, latitudeTitle, longitudeTitle, feelsLikeText, windText, humidityText } from '../main';

export const city = document.getElementById('this-city');
export const latitude = document.getElementById('latitude');
export const longitude = document.getElementById('longitude');

export const fetchUserGeolocation = () => {
  const geoUrl = 'https://ipinfo.io/json?token=bcbc5d4921670a';
  fetch(geoUrl)
    .then((res) => res.json())
    .then(geoData => {
      const local = geoData['loc'].split(',');
      const thisLatitude = Number(local[0]).toFixed(2);
      const thisLongitude = Number(local[1]).toFixed(2);

      city.innerHTML = geoData.city;

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
    })
};
