import { selectedLanguage } from '../main';
import {
  belorussianLanguage,
  englishLanguage,
  monthOnBel,
  monthOnEng,
  monthOnRus,
  russianLanguage
} from '../constants';

export const dateNow = () => {
  const thisDate = document.getElementById('this-date');
  const date = new Date();
  const Year = date.getFullYear();
  const month = date.getMonth();
  let monthTitle;

  if (selectedLanguage === englishLanguage) {
    monthTitle = monthOnEng[month];
  } else if (selectedLanguage === russianLanguage) {
    monthTitle = monthOnRus[month];
  } else if (selectedLanguage === belorussianLanguage) {
    monthTitle = monthOnBel[month];
  }
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  thisDate.innerHTML = day + '-' + monthTitle + '-' + Year + '  ' + hours + ':' + minutes + ':' + seconds;
};
