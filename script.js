// Space Odyssey Stopwatch

let cosmicTime = 0;
let wormholeInterval;
let universeExpanding = false;
let alienEncounters = 0;
let bigBang; // Define bigBang in the global scope

const timePortal = document.getElementById('display');
const starshipControlButton = document.getElementById('startStop');
const blackHoleButton = document.getElementById('reset');
const alienScannerButton = document.getElementById('lap');
const alienLogbook = document.getElementById('lapTimes');

// Quirky space phrases
const spaceQuips = [
    "Time is relative, but this stopwatch isn't!",
    "Counting faster than light speed!",
    "Even Einstein would be impressed!",
    "Time flies when you're traversing galaxies!",
    "Is it time travel if we're always moving forward?"
];

function initiateTimeWarp() {
    if (universeExpanding) {
        clearInterval(wormholeInterval);
        starshipControlButton.textContent = 'Launch';
        universeExpanding = false;
        displaySpaceQuip();
    } else {
        bigBang = Date.now() - cosmicTime; // Set bigBang here
        wormholeInterval = setInterval(updateCosmicTime, 10);
        starshipControlButton.textContent = 'Halt';
        universeExpanding = true;
        makeStarsTwitter();
    }
}

function collapseUniverse() {
    clearInterval(wormholeInterval);
    timePortal.textContent = '00:00:00.000';
    cosmicTime = 0;
    universeExpanding = false;
    starshipControlButton.textContent = 'Launch';
    alienLogbook.innerHTML = '';
    alienEncounters = 0;
    timePortal.style.color = '#00ff00';
    displaySpaceQuip();
}

function updateCosmicTime() {
    cosmicTime = Date.now() - bigBang;
    timePortal.textContent = translateCosmicTime(cosmicTime);
    if (cosmicTime % 10000 < 10) {
        timePortal.style.color = getRandomColor();
    }
}

function translateCosmicTime(time) {
    let lightYears = Math.floor(time / 31536000000);
    let solarOrbits = Math.floor((time % 31536000000) / 86400000);
    let rotations = Math.floor((time % 86400000) / 1000);
    let antimatter = time % 1000;

    return `${padZero(lightYears)}:${padZero(solarOrbits)}:${padZero(rotations)}.${padZero(antimatter, 3)}`;
}

function padZero(num, size = 2) {
    return num.toString().padStart(size, '0');
}

function scanForAliens() {
    if (universeExpanding) {
        alienEncounters++;
        const alienSignal = document.createElement('li');
        alienSignal.textContent = `Alien Signal #${alienEncounters}: ${timePortal.textContent}`;
        alienSignal.style.color = getRandomColor();
        alienLogbook.insertBefore(alienSignal, alienLogbook.firstChild);
        playAlienSound();
    }
}

function getRandomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function displaySpaceQuip() {
    const quip = spaceQuips[Math.floor(Math.random() * spaceQuips.length)];
    const quipElement = document.createElement('p');
    quipElement.textContent = quip;
    quipElement.className = 'space-quip';
    document.querySelector('.container').appendChild(quipElement);
    setTimeout(() => quipElement.remove(), 5000);
}

function makeStarsTwitter() {
    const stars = 100;
    for (let i = 0; i < stars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        document.body.appendChild(star);
    }
}

function playAlienSound() {
    const audio = new Audio('https://www.soundjay.com/buttons/beep-07.wav');
    audio.play();
}

starshipControlButton.addEventListener('click', initiateTimeWarp);
blackHoleButton.addEventListener('click', collapseUniverse);
alienScannerButton.addEventListener('click', scanForAliens);

// Initial space quip
displaySpaceQuip();

// Initial star field
makeStarsTwitter();