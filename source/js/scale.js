// зум
const scale = (scaleControls, scaleValue, img) => {

  // колбек обработчика зума
  const onScaleChange = (evt) => {
    if (evt.target.classList.contains('scale__control--smaller')) {
      if (scaleValue.value !== '25%') {
        scaleValue.value = (parseFloat(scaleValue.value) - 25) + '%' ;
        img.style.transform = `scale(${(parseFloat(scaleValue.value)) / 100})`;
      }
    } else if (evt.target.classList.contains('scale__control--bigger')) {
      if (scaleValue.value !== '100%') {
        scaleValue.value = (parseFloat(scaleValue.value) + 25) + '%' ;
        img.style.transform = `scale(${(parseFloat(scaleValue.value)) / 100})`;
      }
    }
  };
  // обработчик зума
  scaleControls.addEventListener('click', onScaleChange);

  // возвращаем объект с методом для удаления обработчика
  return {
    removeScaleHandler: () => {
      scaleControls.removeEventListener('click', onScaleChange);
    },
  };
};

export { scale };
