import { createMap } from './map-creator';
import { enteredRequestTranslate } from './translator';
import { locationRequest } from '../main';
import { latitude, longitude } from './user-geolocation-handler';

export let cityOnRusLang;

export const fetchLocationCoordinates = () => {
  const locationURL = `https://api.opencagedata.com/geocode/v1/json?q=${locationRequest}&key=ed5e8ea04479465c8f1aa6c66c987afb&pretty=1&no_annotations=1`;
  fetch(locationURL)
    .then((res) => res.json())
    .then(locationData => {
      if (locationData.results[0]) {
        const thisLocationLatitude = locationData.results[0]['geometry']['lat'].toFixed(2);
        const thisLocationLongitude = locationData.results[0]['geometry']['lng'].toFixed(2);

        createMap(thisLocationLongitude, thisLocationLatitude);
        latitude.innerHTML = thisLocationLatitude;
        longitude.innerHTML = thisLocationLongitude;
        cityOnRusLang = locationData.results[0]['components']['city'] || locationData.results[0]['components']['state'];
        enteredRequestTranslate(locationRequest);
      } else {
        throw new Error('Input Error / Ошибка ввода');
      }

    })
};
