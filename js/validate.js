const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;
// форма отправки нового изибражения пользователя
const form = document.querySelector('.img-upload__form');

// инпут хэш-тегов
const hashtagInput = form.querySelector('.text__hashtags');
// инпут комментария
const commentInput = form.querySelector('.text__description');

// валидация хэш-тегов
const validateHashtags = () => {
  // получаем значение инпута хэш-тегов
  const hashtagsValue = hashtagInput.value.trim();

  // сбрасываем ошибку
  hashtagInput.setCustomValidity('');

  // хэш-теги не обязательны
  if (!hashtagsValue) {
    return;
  }

  // получаем массив хэш-тегов
  const hashtags = hashtagsValue.split(/\s+/).filter(tag => tag !== '');
  // уникальные хэш-теги
  const uniqueHashtag = new Set();

  // валидируем массив хэш-тегов
  hashtags.forEach(hashtag => {
    // хэш-тег начинается с символа # (решётка)
    if (!hashtag.startsWith('#')) {
      hashtagInput.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      return;
    }
    // хеш-тег не может состоять только из одной решётки
    if (hashtag.length === 1) {
      hashtagInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      return;
    }
    // допустимые символы
    const validChars = /^#[a-zA-zа-яА-ЯёЁ0-9]+$/;
    if (!validChars.test(hashtag)) {
      hashtagInput.setCustomValidity('хеш-тег содержит недопустимые символы');
      return;
    }
    // максимальная длинна
    if (hashtag.length > HASHTAG_MAX_LENGTH) {
      hashtagInput.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      return;
    }
    // повторяющиеся хэш-теги
    const lowerCaseHashtag = hashtag.toLowerCase();
    if (uniqueHashtag.has(lowerCaseHashtag)) {
      hashtagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      return;
    } else {
      uniqueHashtag.add(lowerCaseHashtag);
    }

  });

  // Проверка на максимальное количество хэш-тегов
  if (hashtags.length > HASHTAG_MAX_COUNT) {
    hashtagInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  }

  // запускаем проверку валидности
  hashtagInput.reportValidity();
};

// валидация комментария
const validateComment = () => {
  // получаем значение инпута комментария
  const commentValue = commentInput.value.trim();

  // сбрасываем ошибку
  commentInput.setCustomValidity('');

  // комментария не обязателен
  if (!commentValue) {
    return;
  }

  // длинна комментария не более 140 символов
  if (commentValue.length > COMMENT_MAX_LENGTH) {
    commentInput.setCustomValidity('максимальная длина одного комментария 140 символов');
  }

  // запускаем проверку валидности
  commentInput.reportValidity();
};

// колбек обработчика инпута хэш-тегов
const onHashtagInput = () => {
  validateHashtags();
};

// колбек обработчика инпута комментария
const onCommentInput = () => {
  validateComment();
};

// добавляем обработчики инпутов
const addValidationHandlers = () => {
  // обработчик инпута хэш-тогов
  hashtagInput.addEventListener('input', onHashtagInput);
  // обработчик инпута комментария
  commentInput.addEventListener('input', onCommentInput);
};

// снимаем обработчики с инпутов
const removeValidationHandlers = () => {
  hashtagInput.removeEventListener('input', onHashtagInput);
  commentInput.removeEventListener('input', onCommentInput);
};



export { addValidationHandlers, removeValidationHandlers };
