var startFlag = true;
var clock;
var startTime;
var resumeFlag = false;
var timeDiffForResume;
var timeSpan;
var startButton;
var resumeButton;

function onLoad() {
    // set global variable when document is loaded
    timeSpan = document.getElementById('time');
    startButton = document.getElementById("startButton");
    resumeButton = document.getElementById("resumeButton");
}


function onStart() {
    if (startFlag) {
        // button is clicked when value is start
        startTime = new Date();
        startButton.innerHTML = "Stop";
        if (clock == undefined) {
            clock = setInterval(() => {
                let timeDiff = (new Date() - startTime) / 1000;
                let minutes = Math.floor(timeDiff / 60);
                let seconds = Math.floor(timeDiff % 60);
                let stringOfTime = minTwoDigits(minutes) + ":" + minTwoDigits(seconds);
                timeSpan.innerHTML = stringOfTime;
            }, 1000);
        }
        startFlag = false;
    } else {
        // button is clicked when value is stop
        startButton.innerHTML = "Start";
        clearInterval(clock);
        timeSpan.innerHTML = "00:00";
        startFlag = true;
        timeDiffForResume = 0;
        clock = undefined;
    }
}

function onPause() {
    if(startFlag){
        // pause without stating the stopwatch
        console.log("OK");
        return 0;
    }
    if (resumeFlag) {
        // set interval from resume timeline
        startTime = new Date();
        if (clock == undefined) {
            clock = setInterval(() => {
                let timeDiff = (new Date() - startTime) / 1000;
                let finalTimeDiffAfterResume = timeDiff + timeDiffForResume;
                let minutes = Math.floor(finalTimeDiffAfterResume / 60);
                let seconds = Math.floor(finalTimeDiffAfterResume % 60);
                let stringOfTime = minTwoDigits(minutes) + ":" + minTwoDigits(seconds);
                timeSpan.innerHTML = stringOfTime;
            }, 1000);
        }
        resumeButton.innerHTML = "Pause";
        resumeFlag = false;
    } else {
        // remove interval and save differece
        if (timeDiffForResume == undefined) {
            // resume hit more than once
            timeDiffForResume = (new Date() - startTime) / 1000; // in seconds
        } else {
            timeDiffForResume = timeDiffForResume + (new Date() - startTime) / 1000; // in seconds
        }
        timeDiffForResume = Math.floor(timeDiffForResume);
        clearInterval(clock);
        resumeButton.innerHTML = "Resume";
        resumeFlag = true;
        clock = undefined;
    }
}

function minTwoDigits(num) {
    return (num < 10 ? "0" : "") + num;
}