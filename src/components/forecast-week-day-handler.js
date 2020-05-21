import { selectedLanguage } from '../main';
import {
  belorussianLanguage,
  daysOnBel,
  daysOnEng,
  daysOnRus,
  englishLanguage,
  russianLanguage
} from '../constants';

export const forecastWeekDay = (dateString) => {
  const getForecastDay = (new Date(dateString).getDay() <= 5) ? new Date(dateString).getDay() + 1 : 0;
  let forecastDayString;

  if (selectedLanguage === englishLanguage) {
    forecastDayString = daysOnEng[getForecastDay];
  } else if (selectedLanguage === russianLanguage) {
    forecastDayString = daysOnRus[getForecastDay];
  } else if (selectedLanguage === belorussianLanguage) {
    forecastDayString = daysOnBel[getForecastDay];
  }

  return forecastDayString;
};
