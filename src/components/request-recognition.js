import { fetchWeatherForecast } from './weather-forecast';
import { fetchLocationCoordinates } from './location-coordinates-handler';
import { englishLanguage, voiceSearch, searchCityInput, russianLanguage } from '../constants';
import { enteredRequestTranslate } from './entered-request-handler';
import { selectedLanguage } from '../main';

export const requestRecognition = () => {
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  voiceSearch.onclick = function() {
    recognition.lang = (selectedLanguage === russianLanguage) ? russianLanguage : englishLanguage;
    recognition.start();
  };

  recognition.onresult = function(event) {
    searchCityInput.value = event.results[0][0].transcript;
    fetchLocationCoordinates(searchCityInput.value);
    fetchWeatherForecast(searchCityInput.value);
    enteredRequestTranslate(searchCityInput.value);
    searchCityInput.value = '';
  };

  recognition.onspeechend = function() {
    recognition.stop();
  };

  recognition.onnomatch = function() {
    alert("I didn't recognise that word.");
  };

  recognition.onerror = function(event) {
    alert('Error occurred in recognition: ' + event.error);
  };


};
