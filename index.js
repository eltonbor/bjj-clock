var clock = $("#clock");
var settingsPopup = $("#settingsPopup");
var height = clock.height();
clock.css({
  "font-size": height / 1.2 + "px",
  "line-height": height / 1.2 + "px",
});

var timerSeconds = 300;
var restSeconds = 30;

function formatTimer(seconds) {
  var date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().slice(14, 19);
}

var seconds = timerSeconds;
var timeout;
var isPlaying;
var isRestTimer = false;

function playButton() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  play();
}

function play() {
  seconds = seconds - 1;
  if (seconds === 0) {
    beep();
  }
  if (seconds > 0 && seconds < 4) {
    shortBeep();
  }
  if (seconds === -1) {
    if (!isRestTimer) {
      isRestTimer = true;
      seconds = restSeconds;
    } else {
      isRestTimer = false;
      seconds = timerSeconds;
    }
  }
  updateClock();
  timeout = setTimeout(function () {
    play();
  }, 1000);
}

function pauseButton() {
  isPlaying = false;
  clearTimeout(timeout);
}

function stopButton() {
  pauseButton();
  seconds = timerSeconds;
  isRestTimer = false;
  updateClock();
}

function settingsButton() {
  stopButton();
  settingsPopup.show();
  clock.hide();
  window.isSettingsPopupShow = true;
}

function updateClock() {
  var formatted = formatTimer(seconds);
  if (formatted.startsWith('0')) {
    formatted = formatted.slice(1, formatted.length);
  }
  clock.html(formatted);
}

function setFightTimer(fight, rest) {
  timerSeconds = fight;
  restSeconds = rest;
  seconds = timerSeconds;
  isRestTimer = false;
  updateClock();
  settingsPopup.hide();
  clock.show();
  window.isSettingsPopupShow = false;
}

function beep() {
  longBeep();
  $('body').addClass('beep');
  setTimeout(function() {
    $('body').removeClass('beep');
  }, 1000);
}

updateClock();