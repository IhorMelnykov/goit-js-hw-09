const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');


let timerId = null;

stopButton.disabled = true;

function disableBtn(btn) {
  btn.disabled = true;
}
function enableBtn(btn) {
  btn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function onStartButtonClick() {
  timerId = setInterval(changeBgColor, 1000);
  disableBtn(startButton);
  enableBtn(stopButton);
}

function onStopButtonClick() {
  clearInterval(timerId);
  disableBtn(stopButton);
  enableBtn(startButton);
}

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);