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
  windRu
} from '../constants';
import { selectedLanguage } from '../main';
import { translateCityOnBel, translateCityOnRus } from './translate-city-titles';
import { selectForecastTitles } from './select-forecast-titles';

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
        city.dataset.cityEn = geoData.city;

        if (selectedLanguage === englishLanguage) {
          city.innerHTML = geoData.city;
          translateCityOnRus(geoData.city);
          translateCityOnBel(geoData.city);
          selectForecastTitles(
            latitudeTitleOnEng,
            longitudeTitleOnEng,
            detailsEn,
            feelsLikeEn,
            windEn,
            humidityTextEn
          );
        } else if (selectedLanguage === russianLanguage) {
          translateCityOnRus(geoData.city);
          translateCityOnBel(geoData.city);
          selectForecastTitles(
            latitudeTitleOnRus,
            longitudeTitleOnRus,
            detailsRu,
            feelsLikeRu,
            windRu,
            humidityTextRu
          );
        } else {
          translateCityOnRus(geoData.city);
          translateCityOnBel(geoData.city);
          selectForecastTitles(
            latitudeTitleOnBel,
            longitudeTitleOnBel,
            detailsBe,
            feelsLikeBe,
            windBe,
            humidityTextBe
          );
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
