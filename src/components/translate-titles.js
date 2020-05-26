import { selectedLanguage } from '../main';
import { belorussianLanguage, russianLanguage } from '../constants';

export const translateTitles = (title, element, datasetTitle) => {
  const titleRusUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${title}&lang=en-ru`;
  fetch(titleRusUrl)
    .then((resp) => resp.json())
    .then(titleRusTranslateData => {
      element.dataset[`${datasetTitle}Ru`] = titleRusTranslateData['text'][0];
      if (selectedLanguage === russianLanguage) {
        element.innerHTML = titleRusTranslateData['text'][0];
      }
    });

  const titleBelUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T204939Z.e8c6dde8f1e98f56.fc10912985c7abe85c8cd8894b6daae169e5604a&text=${title}&lang=en-be`;
  fetch(titleBelUrl)
    .then((resp) => resp.json())
    .then(titleBelTranslateData => {
      element.dataset[`${datasetTitle}Be`] = titleBelTranslateData['text'][0];
      if (selectedLanguage === belorussianLanguage) {
        element.innerHTML = titleBelTranslateData['text'][0];
      }
    });
};
