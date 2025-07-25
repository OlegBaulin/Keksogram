/* global _:readonly */
const getShuffleArr = _.shuffle;
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


export { getShuffleArr, CLASS_HIDDEN, CLASS_MODAL_OPEN, body, isEscapeKey, CLOSE, METHODS, MODALS };
