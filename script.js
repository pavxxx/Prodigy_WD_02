let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseResumeBtn = document.getElementById("pauseResumeBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");


function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = ms % 1000;


    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(3, "0")
    );
}


function startTimer() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;

        startBtn.disabled = true;
        pauseResumeBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        pauseResumeBtn.textContent = "Pause";
    }
}


function pauseResumeTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        pauseResumeBtn.textContent = "Resume";
    } else {
        startTimer();
        pauseResumeBtn.textContent = "Pause";
    }
}


function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    lapCount = 0;
    timeDisplay.textContent = "00:00:00.000";
    lapsList.innerHTML = "";


    startBtn.disabled = false;
    pauseResumeBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    pauseResumeBtn.textContent = "Pause";
}


function recordLap() {
    if (running) {
        lapCount++;
        const li = document.createElement("li");
        li.textContent = "Lap " + lapCount + ": " + formatTime(elapsedTime);
        lapsList.appendChild(li);
    }
}


function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}


startBtn.addEventListener("click", startTimer);
pauseResumeBtn.addEventListener("click", pauseResumeTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
