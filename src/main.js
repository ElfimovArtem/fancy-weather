const languageContainer = document.getElementById('language-container');
const temperatureContainer = document.getElementById('temperature-container');
const searchCityInput = document.getElementById('search-city-input');
const searchCityButton = document.getElementById('search-button');
let selectedLanguage = 'en';

languageContainer.addEventListener('click', (event) => {
  languageContainer.querySelectorAll('.language-button')
    .forEach(el => el.classList.remove('language-button-active'));
  event.target['classList'].add('language-button-active');
  selectedLanguage = event.target['innerHTML'].toLowerCase();
  if (selectedLanguage === 'en') {
    searchCityInput.pattern = "^[a-zA-Z]+$";
    searchCityInput.placeholder = "Search city";
    searchCityButton.innerHTML = 'Search'.toUpperCase();

  } else if (selectedLanguage === 'ru') {
    searchCityInput.pattern = "^[а-яА-Я]+$";
    searchCityInput.placeholder = "Поиск города";
    searchCityButton.innerHTML = 'Поиск'.toUpperCase();
  } else {
    searchCityInput.pattern = "^[a-zA-Z]+$";
    searchCityInput.placeholder = "Пошук гарады";
    searchCityButton.innerHTML = 'Пошук'.toUpperCase();
  }
});

temperatureContainer.addEventListener('click', (ev) => {
  temperatureContainer.querySelectorAll('.temperature-button')
    .forEach(el => el.classList.remove('temperature-button-active'));
  ev.target['classList'].add('temperature-button-active');
});

//-----------------------------------------------------------------------------------
// получаем данные о местоположении пользователя
//-----------------------------------------------------------------------------------

const city = document.getElementById('this-city');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const fetchUserGeolocation = () => {
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

fetchUserGeolocation();

//-----------------------------------------------------------------------------------
// Здесь надо поработать с датой
//-----------------------------------------------------------------------------------

const myInterval = 500;

const dateNow = () => {
  const thisDate = document.getElementById('this-date');
  const date = new Date();
  const Year = date.getFullYear();
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  thisDate.innerHTML = day + '-' + month + '-' + Year + '  ' + hours + ':' + minutes + ':' + seconds;
};

setInterval(() => dateNow(), myInterval);


//-----------------------------------------------------------------------------------
// получаем фото для фона, которое меняется при каждом обновлении страницы
//-----------------------------------------------------------------------------------

const fetchBackgroundImage = () => {
  const imagesUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=weather&client_id=HhbVsjRmqRVv4ziaXpt3PoADeKebbgV__T2gsL5yWC0';
  fetch(imagesUrl)
    .then((res) => res.json())
    .then(imagesData => {
      const imgUrl = imagesData.urls['regular'];
      const wrapper = document.getElementById('wrapper');
      wrapper.style = `background-image: url('${imgUrl}')`;
    })
};

fetchBackgroundImage();

//-----------------------------------------------------------------------------------
// Обработаем нажатие кнопки Refresh - которая служит для смены фонового изображения
//-----------------------------------------------------------------------------------

const refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', () => fetchBackgroundImage());

//-----------------------------------------------------------------------------------
// 1. Обрабатываем запрос из инпута.
// 2. Получаем координаты по названию населённого пункта
//-----------------------------------------------------------------------------------

const searchForm = document.getElementById('search-city-form');
let cityOnRusLang;
let locationRequest;

const fetchLocationCoordinates = () => {
  const locationURL = `https://api.opencagedata.com/geocode/v1/json?q=${locationRequest}&key=ed5e8ea04479465c8f1aa6c66c987afb&pretty=1&no_annotations=1`;
  fetch(locationURL)
    .then((res) => res.json())
    .then(locationData => {
      const thisLocationLatitude = locationData.results[0]['geometry']['lat'].toFixed(2);
      const thisLocationLongitude = locationData.results[0]['geometry']['lng'].toFixed(2);

      createMap(thisLocationLongitude, thisLocationLatitude);
      latitude.innerHTML = thisLocationLatitude;
      longitude.innerHTML = thisLocationLongitude;
      cityOnRusLang = locationData.results[0]['components']['city'] || locationData.results[0]['components']['state'];
      enteredRequestTranslate(locationRequest);
    })
};

searchForm.addEventListener('submit', event => {
  locationRequest = searchCityInput.value;
  searchCityInput.value = '';
  fetchLocationCoordinates();
  event.preventDefault();
});


//-----------------------------------------------------------------------------------
// Работа с картой.
//-----------------------------------------------------------------------------------

const createMap = (longitude, latitude) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxmaW1vdmFydGVtIiwiYSI6ImNrYWF3b2NjZTEwcGcyem1rZWhiOTh0MjkifQ.tOJphjh8MDfpcfVMhckslA';
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
};


//-----------------------------------------------------------------------------------
// Сделаем перевод текста для отображения на англ языке
//-----------------------------------------------------------------------------------

const enteredRequestTranslate = (request) => {
  let translateUrl;
  if (selectedLanguage === 'en') {
    translateUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${request}&lang=ru-en`;
  } else if (selectedLanguage === 'be') {
    translateUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${request}&lang=en-be`;
  } else {
    translateUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${request}&lang=ru-en`;
  }

  fetch(translateUrl)
    .then((resp) => resp.json())
    .then(data => {
      if (selectedLanguage === 'ru') {
        city.innerHTML = cityOnRusLang;
      } else if (selectedLanguage === 'en') {
        city.innerHTML = data.text[0].replace(/^The /gi, '');
      } else {
        city.innerHTML = data.text[0];
      }
    });
};

