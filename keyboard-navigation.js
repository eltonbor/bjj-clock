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
  
var panelButtons = [$("#play"), $("#pause"), $("#stop"), $("#settings")];
var panelButtonsSelectedIndex = 0;
panelButtons[panelButtonsSelectedIndex].addClass("selected");
function mainListener(code) {
  if (code === "Enter" || code === "Space ") {
    panelButtons[panelButtonsSelectedIndex].trigger("click");
    return;
  }
  
  if (code === "ArrowRight") {
    panelButtonsSelectedIndex++;
  } else if (code === "ArrowLeft") {
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
}


var settingsButtons = [
  $('#t-5-60'), $('#t-5-30'),
  $('#t-4-60'), $('#t-4-30'),
  $('#t-3-60'), $('#t-3-30'),
  $('#t-2-60'), $('#t-2-30'),
];
var settingsButtonsSelectedIndex = 0;
settingsButtons[settingsButtonsSelectedIndex].addClass("selected");

function settingsPopupListener(code) {
  if (code === "Enter" || code === "Space ") {
    settingsButtons[settingsButtonsSelectedIndex].trigger("click");
    return;
  }

  if (code === "ArrowUp") {
    settingsButtonsSelectedIndex-=2;
  } else if (code === "ArrowDown") {
    settingsButtonsSelectedIndex+=2;
  } else if (code === "ArrowRight") {
    settingsButtonsSelectedIndex++;
  } else if (code === "ArrowLeft") {
    settingsButtonsSelectedIndex--;
  }

  if (settingsButtonsSelectedIndex < 0) {
    settingsButtonsSelectedIndex = settingsButtons.length + settingsButtonsSelectedIndex;
  }
  if (settingsButtonsSelectedIndex > settingsButtons.length - 1) {
    settingsButtonsSelectedIndex = settingsButtonsSelectedIndex - settingsButtons.length;
  }
  settingsButtons.forEach((b) => b.removeClass("selected"));
  settingsButtons[settingsButtonsSelectedIndex].addClass("selected");
}