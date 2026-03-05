let start = document.querySelector(".strtstop");
let time = document.querySelector("#time");
let ul = document.querySelector("#laplist");
let hour = 0, min = 0, sec = 0, ms = 0;
let running = false;
let timer;
let lap = document.querySelector(".lap");
let lapCount = 1;

start.addEventListener("click", () => {
    if (!running) {
        running = true;
        start.textContent = "Stop";
        start.style.backgroundColor = "red";
        lap.textContent = "Lap";
        timer = setInterval(updateTime, 10);
    } else {
        running = false;
        start.textContent = "Start";
        clearInterval(timer);
        start.style.backgroundColor = "";
        lap.textContent = "Reset";
    }
});

function updateTime() {
    ms += 10;

    if (ms >= 1000) {  
        ms = 0;
        sec++;
    }

    if (sec === 60) { 
        sec = 0; 
        min++; 
    }

    if (min === 60) { 
        min = 0; 
        hour++; 
    }

    time.textContent = formatTime(hour, min, sec, ms);
}

function formatTime(hour, min, sec, ms) {
    let msFormatted = Math.floor(ms / 10).toString().padStart(2, "0");

    return (
        hour.toString().padStart(2, "0") + ":" +
        min.toString().padStart(2, "0") + ":" +
        sec.toString().padStart(2, "0") + ":" +
        msFormatted
    );
}

lap.addEventListener("click", () => {
    if (running) {
        let currentTime = formatTime(hour, min, sec, ms);
        let list = document.createElement("li");
        list.innerHTML = `<span>Lap ${lapCount++}:</span> <span>${currentTime}</span>`;
        ul.prepend(list);
    } else {
        if (lap.textContent === "Reset") {
            hour = 0;
            min = 0;
            sec = 0;
            ms = 0;
            time.textContent = formatTime(hour, min, sec, ms);
            ul.innerHTML = '';  
            lap.textContent = "Lap";
            lapCount = 1;
        }
    }
});
