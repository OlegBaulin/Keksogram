const ScaleConfig = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  PERCENT_DIVISOR: 100,
};
// зум
const scale = (scaleControls, scaleValue, img) => {

  // колбек обработчика зума
  const onScaleChange = (evt) => {
    if (evt.target.classList.contains('scale__control--smaller')) {
      if (scaleValue.value !== `${ScaleConfig.MIN}%`) {
        scaleValue.value = (parseFloat(scaleValue.value) - ScaleConfig.STEP) + '%' ;
        img.style.transform = `scale(${(parseFloat(scaleValue.value)) / ScaleConfig.PERCENT_DIVISOR})`;
      }
    } else if (evt.target.classList.contains('scale__control--bigger')) {
      if (scaleValue.value !== `${ScaleConfig.MAX}%`) {
        scaleValue.value = (parseFloat(scaleValue.value) + ScaleConfig.STEP) + '%' ;
        img.style.transform = `scale(${(parseFloat(scaleValue.value)) / ScaleConfig.PERCENT_DIVISOR})`;
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
