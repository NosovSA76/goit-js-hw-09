import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const deadLineInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
let timeForDeadLine = 0;
let secundForDeadLine = 0;
let dayForDeadLine = 0;
let hourForDeadLine = 0;
let minutForDeadLine = 0;
let endDate;
let intervalId;
let isRunning = false;
startBtn.className = "button-start-stop"
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0]
    if (selectedDate){
    endDate = selectedDate.getTime()}
    const actualDate = new Date()
    const controlDate = actualDate.getTime();
    if (endDate >= controlDate && deadLineInput.value) {
      // перевіряємо вірність дати
      startBtn.disabled = false;
      startBtn.removeEventListener('click', startBtnHandler);
      startBtn.addEventListener('click', startBtnHandler);
      startBtn.style.color = "#7f0cd6"
      startBtn.style.backgroundColor = "#00ff88"
      Report.success(
'Дата обрана!',
'Натиснить кнопку Start для початку відліку!',
'Okay',
);
    ;
    }
    else {
      startBtn.disabled = true;
      Report.failure('Оберіть іншу дату!', 'Але якщо у Вас є машина часу звяжитесь з нами, є гарні пропозиції!');
      startBtn.style.backgroundColor = "#dee8e3"
      startBtn.style.color = "#6a6864"
    }
  },
};

const startBtnHandler = function () {

  if (!isRunning) {
    taimerSet();
    startBtn.textContent = "Stop";
    startBtn.style.backgroundColor = "#ff1500"
    isRunning = true;
    console.log(isRunning)
  } else {
    taimerUserStop();
    startBtn.textContent = "Start";
    isRunning = false;
    console.log(isRunning)
  }
};

flatpickr(deadLineInput, options);

const taimerSet = function () {
  Report.success(
'Відлік розпочато!',
    'Слідкуйте за таймером - час спливає! Для зупинки таймеру натиснить кнопку Stop.',
'Okay',
);
  intervalId = setInterval(() => {
    const newDate = new Date()
    const startDate = newDate.getTime();
    timeForDeadLine = Math.floor((endDate - startDate) / 1000);
    if (timeForDeadLine <= 0) {
      taimerEndStop();
      return;
    }
    secundForDeadLine = timeForDeadLine % 60
    minutForDeadLine = ((timeForDeadLine - secundForDeadLine) / 60) % 60
    dayForDeadLine = Math.floor(timeForDeadLine / 60 / 60 / 24);
    hourForDeadLine = Math.floor((timeForDeadLine - dayForDeadLine * 60 * 60 * 24) / 60 / 60)

    spanDays.textContent = dayForDeadLine.toString().padStart(2, '0');
    spanHours.textContent = hourForDeadLine.toString().padStart(2, '0');
    spanMinutes.textContent = minutForDeadLine.toString().padStart(2, '0');
    spanSeconds.textContent = secundForDeadLine.toString().padStart(2, '0');
  }, 1000);
}
function taimerEndStop() {
    clearInterval(intervalId);
    intervalId = null;
    spanSeconds.textContent = "00";
    startBtn.disabled = true;
    startBtn.style.backgroundColor = "#dee8e3"
    startBtn.style.color = "#6a6864"
    Report.failure('Час вичерпано!', 'Для запуску нового відліку, обирить нову дату!');
}


function taimerUserStop() {
  clearInterval(intervalId);
  intervalId = null;
  spanDays.textContent = "00";
  spanHours.textContent = "00";
  spanMinutes.textContent = "00";
  spanSeconds.textContent = "00";
  startBtn.disabled = true;
  startBtn.style.backgroundColor = "#dee8e3"
  startBtn.style.color = "#6a6864"
  Report.failure('Відлік зупинено!', 'Для запуску нового відліку, обирить нову дату!');
}





