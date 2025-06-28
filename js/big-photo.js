import { isEscapeKey, CLASS_HIDDEN, CLASS_MODAL_OPEN, body } from './util.js';

const STEP_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const closeModalButton = bigPicture.querySelector('.big-picture__cancel');

const commentList = bigPicture.querySelector('.social__comments');
const loadMoreButton = bigPicture.querySelector('.comments-loader');
const bigPhotoImg = bigPicture.querySelector('.big-picture__img > img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const shownCommentsCount = bigPicture.querySelector('.social__shown-comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');

const createComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const renderBigPhoto = (photo) => {
  const comments = photo.comments;
  let shownComments = 0;

  body.classList.add(CLASS_MODAL_OPEN);

  bigPhotoImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = photo.description;

  commentList.replaceChildren();
  loadMoreButton.classList.remove(CLASS_HIDDEN);

  const renderCommentsPortion = () => {
    const portion = comments.slice(shownComments, shownComments + STEP_PER_PORTION);
    const fragment = document.createDocumentFragment();

    portion.forEach((comment) => {
      fragment.appendChild(createComment(comment));
    });

    commentList.appendChild(fragment);
    shownComments += portion.length;
    shownCommentsCount.textContent = shownComments;

    if (shownComments >= comments.length) {
      loadMoreButton.classList.add(CLASS_HIDDEN);
    }
  };

  const onLoadMoreButtonClick = () => {
    renderCommentsPortion();
  };

  const closeBigPhoto = () => {
    bigPicture.classList.add(CLASS_HIDDEN);
    body.classList.remove(CLASS_MODAL_OPEN);
    document.removeEventListener('keydown', onDocumentKeydown);
    closeModalButton.removeEventListener('click', closeBigPhoto);
    loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt.key)) {
      closeBigPhoto();
    }
  }

  document.addEventListener('keydown', onDocumentKeydown);
  closeModalButton.addEventListener('click', closeBigPhoto);
  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);

  renderCommentsPortion();
  bigPicture.classList.remove(CLASS_HIDDEN);
};

export { renderBigPhoto };
