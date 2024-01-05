// Declare global variables to store interval ID, running status, and lap counter
let timer;
let isRunning = false;
let lapCounter = 1;

// Start function to initiate the stopwatch
function start() {
    // Check if the stopwatch is not already running
    if (!isRunning) {
        isRunning = true;  // Set running status to true
        // Set interval to call the updateTimer function every 10 milliseconds
        timer = setInterval(updateTimer, 10);
    }
}

// Stop function to pause the stopwatch
function stop() {
    clearInterval(timer);  // Clear the interval, stopping the timer
    isRunning = false;    // Set running status to false
}

// Reset function to stop the stopwatch and reset all values
function reset() {
    clearInterval(timer);  // Clear the interval, stopping the timer
    isRunning = false;    // Set running status to false
    lapCounter = 1;       // Reset lap counter
    // Reset displayed time and lap display in the HTML
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    document.getElementById("milliseconds").innerText = "00";
    document.getElementById("lapDisplay").innerHTML = "";
}

// Lap function to record a lap time
function lap() {
    // Check if the stopwatch is currently running
    if (isRunning) {
        // Get the current lap time from the timer display
        const lapTime = document.getElementById("timer").innerText;
        // Create a new div element for the lap with lap number and lap time
        const lapItem = document.createElement("div");
        lapItem.innerHTML = `<span>Lap ${lapCounter++}: </span>${lapTime}`;
        // Append the lap information to the lapDisplay container in the HTML
        document.getElementById("lapDisplay").appendChild(lapItem);
    }
}

// UpdateTimer function to increment the timer values
function updateTimer() {
    // Get references to HTML elements representing hours, minutes, seconds, and milliseconds
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const millisecondsElement = document.getElementById("milliseconds");

    // Extract the numeric values from the elements
    let hours = parseInt(hoursElement.innerText);
    let minutes = parseInt(minutesElement.innerText);
    let seconds = parseInt(secondsElement.innerText);
    let milliseconds = parseInt(millisecondsElement.innerText);

    // Increment the milliseconds
    milliseconds++;

    // Check if milliseconds have reached 100 (1 second)
    if (milliseconds > 99) {
        milliseconds = 0;  // Reset milliseconds to 0
        seconds++;         // Increment seconds

        // Check if seconds have reached 60
        if (seconds > 59) {
            seconds = 0;     // Reset seconds to 0
            minutes++;       // Increment minutes

            // Check if minutes have reached 60
            if (minutes > 59) {
                minutes = 0;   // Reset minutes to 0
                hours++;      // Increment hours
            }
        }
    }

    // Update the HTML elements with the padded values
    hoursElement.innerText = padZero(hours);
    minutesElement.innerText = padZero(minutes);
    secondsElement.innerText = padZero(seconds);
    millisecondsElement.innerText = padZero(milliseconds);
}

// PadZero function to ensure numeric values are displayed with two digits
function padZero(value) {
    return value < 10 ? `0${value}` : value;
}
