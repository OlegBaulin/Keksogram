const getRundomInt = _.random;// eslint-disable-line
const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN ='modal-open';
const CLOSE = 'Закрыть';
const body = document.body;

const METHODS = {
  GET: 'GET',
  POST: 'POST',
};

const MODALS = {
  ERROR: 'error',
  SUCCESS: 'success',
};

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const isEscapeKey = (key) => {
  return key === Keys.ESC || key === Keys.ESCAPE;
};

const stringCount = (string, count) => {
  string = string.trim();

  if (typeof string !== 'string' || typeof count !== 'number') {
    throw new Error('Аргументы должны быть строкой и числом');
  }

  if (count <= 0) {
    throw new Error('Число count не может быть отрицательным или равным нулю');
  }

  if (string === undefined || count === undefined) {
    throw new Error('Не переданы обязательные аргументы');
  }

  return string.length <= count;
};

const getRondomElemArr = (arr) => {
  return arr[getRundomInt(0, arr.length -1)];
};

export { getRundomInt, stringCount, getRondomElemArr, CLASS_HIDDEN, CLASS_MODAL_OPEN, body, isEscapeKey, CLOSE, METHODS, MODALS };
