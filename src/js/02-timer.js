import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);

const flatpickrValue = flatpickr("input#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        showTimeError(selectedDates[0]);
  },
 }
);

function showTimeError(selectedDates) {
    if (selectedDates <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      } else {
      refs.startBtn.removeAttribute('disabled');
      }
};

const timer = {
  start() {
   const timerId = setInterval(() => {
      const time = timeToDate();
      
      if (time.seconds < 0) {
        clearInterval(timerId);
        return;
      } 
      updateTimer(time);
      }, 1000);
  },
};

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}; 

function timeToDate() {

  const timeToDate =  timeToDateValue();
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(timeToDate / day));
    const hours = addLeadingZero(Math.floor((timeToDate % day) / hour));
    const minutes = addLeadingZero(Math.floor(((timeToDate % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((timeToDate % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
};

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function timeToDateValue() {
  const searchedDateTime = flatpickrValue.selectedDates[0];
  const currentTime = new Date();

    return searchedDateTime - currentTime;
};

refs.startBtn.addEventListener('click', () => {
  timer.start()
});