import { CLASS_HIDDEN, CLASS_MODAL_OPEN, body, isEscapeKey } from './util.js';
import { scale } from './scale.js';
import { effects, changeLevelEffect } from './effects.js';
import { addValidationHandlers, removeValidationHandlers } from './validate.js';

// контрол загрузки фото
const upload = document.querySelector('#upload-file');
// форма редактирования изображения
const uploadOverlay = document.querySelector('.img-upload__overlay');
// превью изображения
const preview = uploadOverlay.querySelector('.img-upload__preview img');
// контролы зума
const scaleControls = document.querySelector('.img-upload__scale');
const scaleValue = document.querySelector('.scale__control--value');

// контролы эффектов
const effectsControls = document.querySelector('.img-upload__effects');
const effectValue = document.querySelector('.effect-level__value');

// колбек обработчика контрола загрузки фото
const onUploadChange = () => {
  // слайдер эффектов
  const slider = document.querySelector('.img-upload__effect-level');
  slider.classList.add('visually-hidden');
  // eslint-disable-next-line no-undef
  noUiSlider.create(slider, {
    start: 1,
    step: 0.1,
    range: {
      'min': 0,
      'max': 1,
    },
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  // колбек обработчика слайдера
  const onSliderChange = (values, handle) => {
    const value = values[handle];
    effectValue.value = value;
    const typeEffect = preview.classList.value.replace('effects__preview--', '');

    changeLevelEffect(value, typeEffect, preview);
  }

  // обработчик слайдера
  slider.noUiSlider.on('update', onSliderChange);

  // кнопка закрытия формы
  const closeUploadOverlay = document.querySelector('#upload-cancel');
  // колбек обработчика кнопки закрытия формы
  const onCloseButtonClick = () => {
    resetSetings();
    uploadOverlay.classList.add(CLASS_HIDDEN);
    body.classList.remove(CLASS_MODAL_OPEN);
    slider.noUiSlider.destroy();
    closeUploadOverlay.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    scaleRemoveListener.removeScaleHandler();
    effectsRemoveListener.removeEffectsHandler();
    removeValidationHandlers();
  }
  // обработчик кнопки закрытия формы
  closeUploadOverlay.addEventListener('click', onCloseButtonClick);
  // колбек обработчика Esc
  const onDocumentKeydown = (evt) => {
    const inputHashtags = document.querySelector('.text__hashtags');
    const inputComment = document.querySelector('.text__description');
    if (inputHashtags !== document.activeElement && inputComment !== document.activeElement) {
      if (isEscapeKey(evt.key)) {
        onCloseButtonClick();
      }
    }
  };
  // обработчки закрытия формы по нажатию клавиши Esc
  document.addEventListener('keydown', onDocumentKeydown);

  // зум изображения
  const scaleRemoveListener = scale(scaleControls, scaleValue, preview);

  // применение эффектов
  const effectsRemoveListener = effects(effectsControls, effectValue, preview, slider);

  // обработчики валидации
  addValidationHandlers();

  // показываем форму и отключаем скролл у body
  uploadOverlay.classList.remove(CLASS_HIDDEN);
  body.classList.add(CLASS_MODAL_OPEN);

};

// сброс настроек
const resetSetings = () => {
  preview.style.transform = 'scale(1)';
  preview.style.filter = '';
  preview.classList = '';
  scaleValue.value = '100%';
  upload.value = '';
}

// обработчик контрола
upload.addEventListener('change', onUploadChange);
