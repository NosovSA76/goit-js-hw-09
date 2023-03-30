const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId;

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

function startColorChange() {
  startBtn.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
}

function changeBackgroundColor() {
  // Генеруємо випадковий колір та встановлюємо його як фон
  document.body.style.backgroundColor = getRandomHexColor();
  function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    };;
}

function stopColorChange() {
  // Активуємо кнопку "Start" та зупиняємо інтервал
  startBtn.disabled = false;
  clearInterval(intervalId);
  document.body.style.backgroundColor = "#FFFFFF";
}




