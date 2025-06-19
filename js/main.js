import { renderPreview } from './preview.js';
import './editor.js';
import { request } from './fetch.js';
import { showModal } from './modal.js';
import { CLOSE, METHODS, MODALS } from './util.js';

const onSuccess = (photos) => {
  renderPreview(photos);
};

const onError = (err) => {
  showModal(MODALS.ERROR, err, CLOSE);
};

request(onSuccess, onError, METHODS.GET);
