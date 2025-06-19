import { body, isEscapeKey } from './util.js';

const showModal = (modalType, header, btnText) => {
  const modalTemplate = document.querySelector(`#${modalType}`).content.querySelector(`.${modalType}`);
  const modal = modalTemplate.cloneNode(true);
  const modalBtn = modal.querySelector(`.${modalType}__button`);
  const modalFragment = document.createDocumentFragment();

  const closeModal = () => {
    modal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt.key)) {
      closeModal();
    }
  };

  if (header) {
    modal.querySelector(`.${modalType}__title`).textContent = header;
  }

  if (btnText) {
    modalBtn.textContent = btnText;
  }

  modalBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
  modal.addEventListener('click', (evt) => {
    if(evt.target === modal) {
      closeModal();
    }
  });

  modalFragment.appendChild(modal);
  body.appendChild(modalFragment);
};

export { showModal };
