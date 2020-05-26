import { fetchWeatherForecast } from './weather-forecast';
import { fetchLocationCoordinates } from './location-coordinates-handler';
import { selectedLanguage } from '../main';
import { englishLanguage, russianLanguage, voiceSearch, searchCityInput } from '../constants';

export const requestRecognition = () => {
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = (selectedLanguage === russianLanguage) ? russianLanguage : englishLanguage;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  voiceSearch.onclick = function() {
    recognition.start();
    console.log('Получаем запрос...');
  };

  recognition.onresult = function(event) {
    console.log(event.results[0][0].transcript);
    searchCityInput.value = event.results[0][0].transcript;
  };

  recognition.onspeechend = function() {
    recognition.stop();
    fetchLocationCoordinates();
    fetchWeatherForecast(searchCityInput.value);
    searchCityInput.value = '';
    // searchForm.submit(); если не сработает, то добавить form.action и сабмитать
    console.log('Получено, обрабатываем запрос...');
  };

  // recognition.onnomatch = function(event) {
  //   diagnostic.textContent = "I didn't recognise that color.";
  // };

  // recognition.onerror = function(event) {
  //   diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  // };


};
