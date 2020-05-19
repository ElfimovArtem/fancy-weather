export const fetchBackgroundImage = () => {
  const imagesUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=weather&client_id=HhbVsjRmqRVv4ziaXpt3PoADeKebbgV__T2gsL5yWC0';
  fetch(imagesUrl)
    .then((res) => res.json())
    .then(imagesData => {
      const imgUrl = imagesData.urls['regular'];
      const wrapper = document.getElementById('wrapper');
      wrapper.style = `background-image: url('${imgUrl}')`;
    })
};
