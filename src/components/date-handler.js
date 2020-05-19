export const dateNow = () => {
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
