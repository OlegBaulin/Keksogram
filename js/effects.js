// объект с настройками слайдера
const sliderOptions = {
  'chrome': {
    start: 1,
    step: 0.1,
    range: {
      'min': 0,
      'max': 1,
    },
  },
  'sepia': {
    start: 1,
    step: 0.1,
    range: {
      'min': 0,
      'max': 1,
    },
  },
  'marvin': {
    start: 100,
    step: 1,
    range: {
      'min': 0,
      'max': 100,
    },
  },
  'phobos': {
    start: 3,
    step: 0.1,
    range: {
      'min': 0,
      'max': 3,
    },
  },
  'heat': {
    start: 3,
    step: 0.1,
    range: {
      'min': 0,
      'max': 3,
    },
  },
};

const effects = (effectsControls, effectValue, preview, slider) => {

  const settingEffect = (value) => {
    slider.classList.remove('visually-hidden');
    preview.classList = '';
    preview.classList.add(`effects__preview--${value}`);
    slider.noUiSlider.updateOptions(sliderOptions[value]);
    effectValue.value = slider.noUiSlider.get();
  };

  const onChangeEffect = (evt) => {
    const value = evt.target.value;
    switch (value) {
      case 'none':
        slider.classList.add('visually-hidden');
        preview.classList = '';
        preview.classList.add(`effects__preview--${value}`);
        preview.style.filter = 'none';
        break;
      case 'chrome':
        settingEffect(value);
        break;
      case 'sepia':
        settingEffect(value);
        break;
      case 'marvin':
        settingEffect(value);
        break;
      case 'phobos':
        settingEffect(value);
        break;
      case 'heat':
        settingEffect(value);
        break;
      default:
        break;
    }
  };

  // обработчик контролов эффектов
  effectsControls.addEventListener('change', onChangeEffect);

  // возвращаем объект с методом для удаления обработчика
  return {
    removeEffectsHandler: () => {
      effectsControls.removeEventListener('change', onChangeEffect);
    },
  };
};

const changeLevelEffect = (value, typeEffect, preview) => {
  switch (typeEffect) {
    case 'none':
      return;
    case 'chrome':
      preview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      preview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      preview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      preview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      preview.style.filter = `brightness(${value})`;
      break;
    default:
      break;
  }
};

export { effects, changeLevelEffect };
