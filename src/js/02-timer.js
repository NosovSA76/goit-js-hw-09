import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const serg = selectedDates[0]
    endDate = serg.getTime()
    console.log(endDate)
    const actualDate = new Date()
    const controlDate = actualDate.getTime();
    console.log(controlDate)
    if (endDate >= controlDate) {
      // перевіряємо вірність дати
      startBtn.disabled = false;
      startBtn.addEventListener('click', taimerSet);
    }
    else {
      startBtn.disabled = true;
      startBtn.removeEventListener('click', alert("Дата менша за сучасну") );
    }
  },
};

flatpickr(deadLineInput, options);

const taimerSet = function () {
  const newDate = new Date()
  const startDate = newDate.getTime();
  timeForDeadLine = Math.round((endDate - startDate) / 1000);
  secundForDeadLine = timeForDeadLine % 60
  minutForDeadLine = ((timeForDeadLine - secundForDeadLine) / 60) % 60
  dayForDeadLine = Math.floor(timeForDeadLine / 60 / 60 / 24);
  hourForDeadLine = Math.floor((timeForDeadLine - dayForDeadLine * 60 * 60 * 24) / 60 / 60)

  spanDays.textContent = dayForDeadLine.toString().padStart(2, '0');
  spanHours.textContent = hourForDeadLine.toString().padStart(2, '0');
  spanMinutes.textContent = minutForDeadLine.toString().padStart(2, '0');
  spanSeconds.textContent = secundForDeadLine.toString().padStart(2, '0');

  intervalId = setInterval(taimerStart, 1000);


// const inputText = deadLineInput.value;
// const [datePart, timePart] = inputText.split(" ");
// const [year, month, day] = datePart.split("-");
// const [hours, minutes] = timePart.split(":");
// const date = new Date(year, month - 1, day, hours, minutes);
//   console.log(date)
//  console.log(endDate);
};

const taimerStart = function () {

let secunds = secundForDeadLine
 intervalId = setInterval(() => {
    for (i = 0; i <= timeForDeadLine; i +=1){
      secunds = secunds - 1
  spanSeconds.textContent = secunds.toString().padStart(2, '0');

  }}, 1000)


}


// if (selectedDates[0] >= Date()) {
//   startBtn.disabled = false;
// Console.loge(Date())}

// deadLineInput.addEventListener('input', startTimerForDeadline());

// startTimerForDeadline(

// );



