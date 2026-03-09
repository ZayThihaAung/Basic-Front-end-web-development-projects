// Stop Watch

const stopWatchTag = document.getElementsByClassName('stopWatch')[0];
const milisecondTag = document.getElementsByClassName('milisecondTag')[0];
const startButtonTag = document.getElementsByClassName('startButton')[0];
const pauseButtonTag = document.getElementsByClassName('pauseButton')[0];
const continueButtonTag = document.getElementsByClassName('continueButton')[0];
const restartButtonTag = document.getElementsByClassName('restartButton')[0];

let seconds = 0, minutes = 0, hours = 0, milliseconds = 0// u can declare if u have to declare multiple
// variable to declare with let 

// increasing seconds, minutes and hours
// setInterval method (it's a window method)
/*
The setInterval() method calls a function at specified intervals (in milliseconds).
The setInterval() method continues calling the function until clearInterval() is called, or the window is closed.
1 second = 1000 milliseconds.
*/

const startTime = () => {
    milliseconds += 1000
    if(milliseconds === 10000){
        milliseconds =0
    }
    seconds+= 1;
    if(seconds===60){
        seconds =0
        minutes+=1
    }else if(minutes===60){
        minutes =0;
        hours+= 1
    }

    // Ternary Opreator
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const hourText = hours < 10 ? "0" + hours.toString() : hours;
    const millisecondsText = milliseconds < 1000 ? '0' + milliseconds.toString() : milliseconds;
    // The textContent property sets or returns the text content of the specified node, and all its descendants.
    stopWatchTag.textContent= hourText + ':' + minutesText + ':' + secondText 
    milisecondTag.textContent =   millisecondsText
}
/*Ternary Operator
The ternary operator is a simplified conditional operator like if / else.
Syntax: condition ? <expression if true> : <expression if false>
Here is an example using if / else:*/

// setInterval(callback, 1000)

// clearInterval method (it's also window meathod)
// The clearInterval() method clears a timer set with the setInterval() method.
// to stop setInterval

// let intervalId = setInterval(startTime, 1000);
// clearInterval(intervalId);

let intervalId
startButtonTag.addEventListener('click', () => {
    intervalId = setInterval(startTime, 1000, startTime, 1)
})

pauseButtonTag.addEventListener('click', () => {
    clearInterval(intervalId)
})

continueButtonTag.addEventListener('click', ()=> {
    clearInterval(intervalId) // add this plz bc you'll see if u press continue button when the time is running 
    intervalId = setInterval(startTime, 1000)
});

restartButtonTag.addEventListener('click', ()=> {
    clearInterval(intervalId)
    seconds =0, minutes =0, hours=0 , milliseconds =0// don't forget comma 
    intervalId = setInterval(startTime, 1000)
})
