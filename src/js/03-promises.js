import Notiflix from 'notiflix';

const form = document.querySelector(".form");

  function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const inputValues = {};

  for (const [key, value] of formData.entries()) {
    inputValues[key] = Number(value);
  }

  let { amount, step, delay } = inputValues;

  for (let i = 1; i <= amount; i += 1) {
  createPromise(i, delay) 
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  delay += step;
  form.reset();
  }
};

form.addEventListener('submit', onFormSubmit);