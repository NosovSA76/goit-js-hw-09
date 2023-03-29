// var throttle = require('lodash.throttle');
// const documentBody = document.querySelector('body');
// const actionButton = document.querySelectorAll('button');


// actionButton.addEventListener('click', (buttonClick));
// // fidbackForm.addEventListener('submit', onFormSubmit);
// // reloadPage();

// console.log(actionButton[1].textContent)

// function buttonClick(event) {
//   if (event.currentTarget.textContent = "Start") {
//     changeColorStart();
//   } else{changeColorStop();}
// }

// throttle(function changeColorStart() {
//   const currentColor = function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
//   }
//   documentBody.style.backgraundColor = currentColor;
// }, 500)
const button = document.querySelectorAll(button)
// const startBtn = document.querySelector(".js-start");
// const stopBtn = document.querySelector(".js-stop");
// let timerId = null;
button.addEventListener("click", () => {
  if (EventTarget.textContent = "Start")
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    };
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
});



