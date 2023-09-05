function longBeep() {
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 800;
  oscillator.connect(context.destination);
  oscillator.start();
  // Beep for 1000 milliseconds
  setTimeout(function () {
    oscillator.stop();
  }, 1000);
}

function shortBeep() {
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 800;
  oscillator.connect(context.destination);
  oscillator.start();
  // Beep for 100 milliseconds
  setTimeout(function () {
    oscillator.stop();
  }, 100);
}
