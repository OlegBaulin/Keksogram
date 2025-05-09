import { isEscapeKey, CLASS_HIDDEN, CLASS_MODAL_OPEN, body } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const closeModalButton = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = () => {
  if (isEscapeKey) {
    onCloseButtonClick();
  }
};

const onCloseButtonClick = () => {
  bigPicture.classList.add(CLASS_HIDDEN);
  body.classList.remove(CLASS_MODAL_OPEN);
  document.removeEventListener('keydown', onDocumentKeydown);
  closeModalButton.removeEventListener('click', onCloseButtonClick);
};

const createComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const renderBigPhoto = (photo) => {
  const fragment = document.createDocumentFragment();
  const commentList = bigPicture.querySelector('.social__comments');
  const comments = photo.comments;

  document.addEventListener('keydown', onDocumentKeydown);
  closeModalButton.addEventListener('click', onCloseButtonClick);

  bigPicture.querySelector('.social__comment-count').classList.add(CLASS_HIDDEN);
  bigPicture.querySelector('.comments-loader').classList.add(CLASS_HIDDEN);

  body.classList.add(CLASS_MODAL_OPEN);

  bigPicture.querySelector('.big-picture__img > img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  comments.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  commentList.replaceChildren();
  commentList.appendChild(fragment);

  bigPicture.classList.remove(CLASS_HIDDEN);

};

export { renderBigPhoto };
