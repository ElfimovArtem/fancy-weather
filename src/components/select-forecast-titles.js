import {
  feelsLikeText,
  humidityText,
  latitudeTitle,
  longitudeTitle,
  windText,
  details
} from '../constants';

export const selectForecastTitles = (latitude, longitude, detailsText, feelsLike, wind, humidity) => {
  latitudeTitle.innerHTML = latitude;
  longitudeTitle.innerHTML = longitude;
  details.innerHTML = detailsText;
  feelsLikeText.innerHTML = feelsLike;
  windText.innerHTML = wind;
  humidityText.innerHTML = humidity;
};
