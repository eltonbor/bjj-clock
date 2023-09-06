document.addEventListener("keydown", function keypress(e) {
  // console.log(e.code);
  if (e.code === "Escape") {
    stopButton();
    setFightTimer(timerSeconds, restSeconds);
  }
  if (window.isSettingsPopupShow) {
    settingsPopupListener(e.code);
    return;
  }
  mainListener(e.code);
});

function mainListener(code) {
  if (code === "Enter" || code === "Space") {
    if (window.isPlaying) {
      pauseButton();
    } else {
      playButton();
    }
  }
}

// prettier-ignore
var settingsButtons = [
  $("#t-5-60"), $("#t-5-30"),
  $("#t-4-60"), $("#t-4-30"),
  $("#t-3-60"), $("#t-3-30"),
  $("#t-2-60"), $("#t-2-30"),
];
var settingsButtonsSelectedIndex = 0;
settingsButtons[settingsButtonsSelectedIndex].addClass("selected");

function settingsPopupListener(code) {
  if (code === "Enter" || code === "Space ") {
    settingsButtons[settingsButtonsSelectedIndex].trigger("click");
    return;
  }

  if (code === "ArrowUp") {
    settingsButtonsSelectedIndex -= 2;
  } else if (code === "ArrowDown") {
    settingsButtonsSelectedIndex += 2;
  } else if (code === "ArrowRight") {
    settingsButtonsSelectedIndex++;
  } else if (code === "ArrowLeft") {
    settingsButtonsSelectedIndex--;
  }

  if (settingsButtonsSelectedIndex < 0) {
    settingsButtonsSelectedIndex =
      settingsButtons.length + settingsButtonsSelectedIndex;
  }
  if (settingsButtonsSelectedIndex > settingsButtons.length - 1) {
    settingsButtonsSelectedIndex =
      settingsButtonsSelectedIndex - settingsButtons.length;
  }
  settingsButtons.forEach((b) => b.removeClass("selected"));
  settingsButtons[settingsButtonsSelectedIndex].addClass("selected");
}
