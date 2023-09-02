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
    if (!rest) {
      rest = true;
      seconds = restSeconds;
    } else {
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
  updateClock();
}

function settingsButton() {
  stopButton();
  settingsPopup.show();
  clock.hide();
}

function updateClock() {
  clock.html(formatTimer(seconds));
}

var panelButtons = [$("#play"), $("#pause"), $("#stop"), $("#settings")];
var panelButtonsSelectedIndex = 0;
document.addEventListener("keydown", function keypress(e) {
  console.log(e.code);
  if (e.code === "Enter" || e.code === "Space ") {
    panelButtons[panelButtonsSelectedIndex].trigger("click");
    return;
  }
  if (e.code === "Escape") {
    stopButton();
    setFightTimer(timerSeconds, restSeconds);
  }
  if (e.code === "ArrowRight") {
    panelButtonsSelectedIndex++;
  }
  if (e.code === "ArrowLeft") {
    panelButtonsSelectedIndex--;
  }
  if (panelButtonsSelectedIndex === -1) {
    panelButtonsSelectedIndex = panelButtons.length - 1;
  }
  if (panelButtonsSelectedIndex > panelButtons.length - 1) {
    panelButtonsSelectedIndex = 0;
  }
  panelButtons.forEach((b) => b.removeClass("selected"));
  panelButtons[panelButtonsSelectedIndex].addClass("selected");
});
panelButtons[panelButtonsSelectedIndex].addClass("selected");

function setFightTimer(fight, rest) {
  timerSeconds = fight;
  restSeconds = rest;
  seconds = timerSeconds;
  updateClock();
  settingsPopup.hide();
  clock.show();
}

function beep() {
  console.log("beep");
}
