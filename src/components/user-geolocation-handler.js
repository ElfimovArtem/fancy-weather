import { createMap } from './map-creator';

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

      latitude.innerHTML = thisLatitude;
      longitude.innerHTML = thisLongitude;

      createMap(thisLongitude, thisLatitude);
    })
};
