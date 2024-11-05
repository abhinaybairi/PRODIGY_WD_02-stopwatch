let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let interval;
let lapCount = 0;

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    milliseconds: String(milliseconds).padStart(3, "0"),
  };
}

function updateTime() {
  elapsedTime = Date.now() - startTime + elapsedTime;
  const formattedTime = formatTime(elapsedTime);
  
  hoursDisplay.textContent = formattedTime.hours;
  minutesDisplay.textContent = formattedTime.minutes;
  secondsDisplay.textContent = formattedTime.seconds;
  millisecondsDisplay.textContent = formattedTime.milliseconds;
}

function startStopwatch() {
  startTime = Date.now();
  interval = setInterval(updateTime, 10); // update every 10ms
  startStopButton.textContent = "Pause";
  isRunning = true;
}

function stopStopwatch() {
  clearInterval(interval);
  startStopButton.textContent = "Resume";
  isRunning = false;
}

function toggleStartStop() {
  if (isRunning) {
    stopStopwatch();
  } else {
    startStopwatch();
  }
}

function resetStopwatch() {
  clearInterval(interval);
  isRunning = false;
  elapsedTime = 0;
  startStopButton.textContent = "Start";
  updateTime();
}

function recordLap() {
  if (isRunning) {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = Lap ${lapCount}: ${lapTime.hours}:${lapTime.minutes}:${lapTime.seconds}:${lapTime.milliseconds};
    lapsList.appendChild(lapItem);
  }
}

startStopButton.addEventListener("click", toggleStartStop);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);