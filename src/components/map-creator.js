export const createMap = (longitude, latitude) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxmaW1vdmFydGVtIiwiYSI6ImNrYWF3b2NjZTEwcGcyem1rZWhiOTh0MjkifQ.tOJphjh8MDfpcfVMhckslA';
  new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
};
