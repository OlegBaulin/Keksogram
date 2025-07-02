const Urls = {
  GET: 'https://23.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://23.javascript.htmlacademy.pro/kekstagram',
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  const { statusText, status } = response;
  throw new Error(`${status} — ${statusText}`);
};

const request = (onSuccess, onError, method, body) => {
  fetch(Urls[method], {
    method,
    body,
  })
    .then(checkStatus)
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch((err) => onError(err));
};

export { request };
