const CLASS_VISUALLY_HIDDEN = 'visually-hidden';
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

const setupEffects = (effectsControls, effectValue, preview, slider) => {

  const settingEffect = (value) => {
    slider.classList.remove(CLASS_VISUALLY_HIDDEN);
    preview.classList = '';
    preview.classList.add(`effects__preview--${value}`);
    slider.noUiSlider.updateOptions(sliderOptions[value]);
    effectValue.value = slider.noUiSlider.get();
  };

  const onEffectChange = (evt) => {
    const value = evt.target.value;
    switch (value) {
      case 'none':
        slider.classList.add(CLASS_VISUALLY_HIDDEN);
        preview.classList = '';
        preview.classList.add(`effects__preview--${value}`);
        preview.style.filter = 'none';
        break;
      default:
        settingEffect(value);
        break;
    }
  };

  // обработчик контролов эффектов
  effectsControls.addEventListener('change', onEffectChange);

  // возвращаем объект с методом для удаления обработчика
  return {
    removeEffectsHandler: () => {
      effectsControls.removeEventListener('change', onEffectChange);
    },
  };
};

const changeLevelEffect = (value, typeEffect, preview) => {

  if (typeEffect === 'none') {
    return;
  }

  const filterEffects = {
    'chrome': (level) => `grayscale(${level})`,
    'sepia': (level) => `sepia(${level})`,
    'marvin': (level) => `invert(${level}%)`,
    'phobos': (level) => `blur(${level}px)`,
    'heat': (level) => `brightness(${level})`,
  };

  const generateFilter = filterEffects[typeEffect];

  if (generateFilter) {
    preview.style.filter = generateFilter(value);
  }

};

export { setupEffects, changeLevelEffect };
