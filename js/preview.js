const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoList = document.querySelector('.pictures');

const createPreview = ({ url, likes, comments}) => {
  const preview = previewTemplate.cloneNode(true);

  preview.querySelector('.picture__img').src = url;
  preview.querySelector('.picture__likes').textContent = likes;
  preview.querySelector('.picture__comments').textContent = comments.length;

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
