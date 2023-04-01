import { Notify } from 'notiflix/build/notiflix-notify-aio';

const creatBtn = document.querySelector('button[type="submit"]')
const form = document.querySelector('form.form');


creatBtn.addEventListener('click', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(e) {
  e.preventDefault();
  const { delay, step, amount } = form.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);
  console.log(inputDelay);
  console.log(inputStep);
  console.log(inputAmount);
  for (let i = 1; i <= inputAmount; i += 1) {
    if (i > 1) { inputDelay += inputStep; }

    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`

        );
      });
    form.reset();
  }
}