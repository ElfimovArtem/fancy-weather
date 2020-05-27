import { defaultBackgroundUrl } from '../constants';

export const fetchBackgroundImage = () => {
  const wrapper = document.getElementById('wrapper');
  const imagesUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=weather&client_id=HhbVsjRmqRVv4ziaXpt3PoADeKebbgV__T2gsL5yWC0';
  fetch(imagesUrl)
    .then((res) => res.json())
    .then(imagesData => {
      if (imagesData.urls['regular']) {
        const imgUrl = imagesData.urls['regular'];
        wrapper.style = `background-image: url('${imgUrl}')`;
      } else {
        alert('Сервер с фоновыми изображениями не доступен, отображена стандартная картинка..');
        wrapper.style = `background-image: url('${defaultBackgroundUrl}')`;
      }

    })
};
