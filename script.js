let timer;
let isRunning = false;
let seconds = 0, minutes = 0, hours = 0;
let lapCount = 0;

function updateDisplay() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("time").innerText = `${h}:${m}:${s}`;
}

function startStop() {
    if (!isRunning) {
        timer = setInterval(() => {
            seconds++;
            if (seconds == 60) { seconds = 0; minutes++; }
            if (minutes == 60) { minutes = 0; hours++; }
            updateDisplay();
        }, 1000);
        isRunning = true;
    } else {
        clearInterval(timer);
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0; minutes = 0; hours = 0;
    lapCount = 0;
    document.getElementById("laps").innerHTML = "";
    updateDisplay();
}

function lap() {
    if (isRunning) {
        lapCount++;
        let time = document.getElementById("time").innerText;
        let lapDiv = document.createElement("div");
        lapDiv.innerText = `Lap ${lapCount}: ${time}`;
        document.getElementById("laps").prepend(lapDiv); // latest lap on top
    }
}

updateDisplay();
