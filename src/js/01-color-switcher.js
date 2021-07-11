//import '../css/common.css';

const TIMER_INTERVAL = 1000;

const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.btnStart.addEventListener('click', startTimer);
refs.btnStop.addEventListener('click', stopTimer);

function startTimer() {
  refs.btnStart.disabled = true;
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, TIMER_INTERVAL);
}

function stopTimer() {
  if (timerId === null) return;
  clearInterval(timerId);
  timerId = null;
  refs.btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
