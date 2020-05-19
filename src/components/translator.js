import { selectedLanguage } from '../main';
import { city } from './user-geolocation-handler';
import { cityOnRusLang } from './location-coordinates-handler';

export const enteredRequestTranslate = (request) => {
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

