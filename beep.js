var context;
var oscillator;
function getOscillator() {
  if (oscillator) {
    return oscillator;
  }
  context = new AudioContext();
  oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 0;
  oscillator.connect(context.destination);
  oscillator.start();
  return oscillator;
}

function longBeep() {
  getOscillator().frequency.value = 800;
  setTimeout(() => (getOscillator().frequency.value = 0), 1000);
}

function shortBeep() {
  getOscillator().frequency.value = 800;
  setTimeout(() => (getOscillator().frequency.value = 0), 100);
}

function startAudio() {
  getOscillator();
}
