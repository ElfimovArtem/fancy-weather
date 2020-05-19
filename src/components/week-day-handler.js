import { daysOnRus, daysOnEng, daysOnBel } from '../constants';
import { selectedLanguage, weekDay } from '../main';
import { russianLanguage, englishLanguage, belorussianLanguage } from '../constants';

export const getWeekDay = () => {
  const date = new Date();
  const thisWeekDay = date.getDay();

  if (selectedLanguage === englishLanguage) {
    weekDay.innerHTML = daysOnEng[thisWeekDay];
  } else if (selectedLanguage === russianLanguage) {
    weekDay.innerHTML = daysOnRus[thisWeekDay];
  } else if (selectedLanguage === belorussianLanguage) {
    weekDay.innerHTML = daysOnBel[thisWeekDay];
  }
};
