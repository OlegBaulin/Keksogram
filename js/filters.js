/* global _:readonly */
import { renderPreview } from './preview.js';
import { getShuffleArr } from './util.js';

const CLASS_INACTIVE = 'img-filters--inactive';
const CLASS_ACTIVE_BTN = 'img-filters__button--active';
const RANDOM_COUNT = 10;
const DELAY = 500;


const filters = document.querySelector('.img-filters');
const formFilters = filters.querySelector('.img-filters__form');

const filtersPhotos = {
  'filter-random': (photos) => {
    renderPreview(getShuffleArr(photos).slice(0, RANDOM_COUNT));
  },
  'filter-discussed': (photos) => {
    renderPreview(photos.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    }));
  },
  'filter-default': (photos) => {
    renderPreview(photos);
  },
};

const removePictures = () => {
  const pictures = document.querySelectorAll('.picture');

  if (pictures) {
    pictures.forEach((picture) => picture.remove());
  }

};

const addClassActiveBtn = (btn) => {
  btn.classList.add(CLASS_ACTIVE_BTN);
};

const removeClassActiveBtn = () => {
  const buttons = formFilters.children;

  for (const btn of buttons) {
    btn.classList.remove(CLASS_ACTIVE_BTN);
  }
};

const filtersPictures = (photos) => {

  filters.classList.remove(CLASS_INACTIVE);

  const debouncedRender = _.debounce((filterId, photos) => {
    removePictures();
    filtersPhotos[filterId](photos);
  }, DELAY);

  const onClickButton = (evt) => {
    const activeBtn = evt.target;

    if (activeBtn.classList.contains('img-filters__button')) {
      removeClassActiveBtn();
      addClassActiveBtn(activeBtn);
      debouncedRender(activeBtn.id, photos);
    }

  };

  formFilters.addEventListener('click', onClickButton);

};

export { filtersPictures };
