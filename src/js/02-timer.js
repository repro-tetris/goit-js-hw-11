import '../css/common.css';
import '../css/02-timer.scss';

import Swal from 'sweetalert2';

const TIMER_INTERVAL = 1000;

const refs = {
  startCountdown: document.querySelector('button[data-start]'),
  dateSelectorEl: document.querySelector('#date-selector'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
let enteredDate = null;
let intervalId = null;

refs.dateSelectorEl.addEventListener('change', function (e) {
  enteredDate = new Date(e.target.value).getTime();
  if (enteredDate - Date.now() <= 0) {
    Swal.fire({
      title: 'Error!',
      text: 'Please choose a date in the future',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    return;
  }

  refs.startCountdown.disabled = false;
});

refs.startCountdown.addEventListener('click', () => {
  refs.dateSelectorEl.disabled = true;
  refs.startCountdown.disabled = true;
  setCurrentInterval();

  intervalId = setInterval(function () {
    const { days, hours, minutes, seconds } = setCurrentInterval();
    if (days + hours + minutes + seconds === 0) {
      clearInterval(intervalId);
      refs.dateSelectorEl.disabled = false;
    }
  }, TIMER_INTERVAL);
});

function setCurrentInterval() {
  const curInterval = enteredDate - Date.now();

  const curTimer = convertMs(curInterval);

  setTimerElements(curTimer);
  return curTimer;
}

function setTimerElements({ days, hours, minutes, seconds }) {
  refs.daysEl.innerHTML = days.toString().padStart(3, '0');
  refs.hoursEl.innerHTML = hours.toString().padStart(2, '0');
  refs.minutesEl.innerHTML = minutes.toString().padStart(2, '0');
  refs.secondsEl.innerHTML = seconds.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
