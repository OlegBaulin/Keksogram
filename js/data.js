import { getRundomInt, getRondomElemArr } from './util.js';

const PHOTO_COUNT = 25;

const photos = [];

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 1,
  MAX: 5,
}

const Id = {
  MIN: 0,
  MAX: 999,
}

const Avatar = {
  MIN: 1,
  MAX: 6,
}

const NAMES = [
  'Денис',
  'Виктор',
  'Павел',
  'Кристина',
  'Владислав',
  'Яна',
  'Раиса',
  'Марат',
  'Маша',
  'Ярослав',
];

const DESCR_PHOTO = [
  'Без фильтров',
  'Новая камера',
  'Зацените фотку!',
  'Хороший ракурс',
  'Просто так',
  'Из архива',
];

const MESSAGES = [
  'Всё отлично',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?',
];

const addComments = () => {
  const comments = [];

  for (let i = 0; i <= getRundomInt(Comments.MIN, Comments.MAX); i++) {
    comments.push({
      id: getRundomInt(Id.MIN, Id.MAX),
      url: `img/avatar-${getRundomInt(Avatar.MIN, Avatar.MAX)}.svg`,
      message: getRondomElemArr(MESSAGES),
      name: getRondomElemArr(NAMES),
    });
  }

  return comments;
}

const createMockData = () => {

  for(let i = 0; i < PHOTO_COUNT; i++) {
    photos.push({
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: getRondomElemArr(DESCR_PHOTO),
      likes: getRundomInt(Likes.MIN, Likes.MAX),
      comments: addComments(),
    });
  }
}

createMockData();

export { photos };
