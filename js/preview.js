import { renderBigPhoto } from './big-photo.js';

const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoList = document.querySelector('.pictures');

const createPreview = (photo) => {
  const preview = previewTemplate.cloneNode(true);

  preview.querySelector('.picture__img').src = photo.url;
  preview.querySelector('.picture__likes').textContent = photo.likes;
  preview.querySelector('.picture__comments').textContent = photo.comments.length;

  preview.addEventListener('click', (evt) => {
    evt.preventDefault();

    renderBigPhoto(photo);
  });

  return preview;
};

const renderPreview = (photos) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(createPreview(photos[i]));
  }

  photoList.appendChild(fragment);
};

export { renderPreview };
