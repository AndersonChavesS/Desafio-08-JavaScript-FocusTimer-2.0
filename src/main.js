const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const controls = document.getElementById('controls');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const kichenTimer = document.getElementById('../assets/kichen-timer.mp3');

// state
const state = {
  minutes: 25,
  seconds: 0,
  isActive: false,
  isMute: true,
  countdownId: null,
};
updateCounter();

// toggleMode
let lightMode = true;
const buttonToggle = document.getElementById('toggle-mode');
buttonToggle.addEventListener('click', (e) => {
  document.documentElement.classList.toggle('dark');
  const mode = lightMode ? 'dark' : 'light';
  e.currentTarget.querySelector('span').textContent = `${mode} mode ativado`;
  lightMode = !lightMode;
});

// functions
function playInit() {
  play.classList.toggle('active');
  clearTimeout(state.countdownId);

  if (play.classList.contains('active')) {
    state.isActive = true;
    state.countdownId = setInterval(() => {
      if (state.seconds === 0 && state.minutes === 0) {
        clearInterval(state.countdownId);
        state.isActive = false;
        play.classList.remove('active');
        return;
      }

      if (state.seconds === 0) {
        state.seconds = 59;
        state.minutes -= 1;
      } else {
        state.seconds -= 1;
      }

      updateCounter();
      return
    }, 1000);
  }
}

function counterStop() {
  play.classList.remove('active');
  clearTimeout(state.countdownId);
  state.isActive = false;
  state.minutes = 25;
  state.seconds = 0;
  updateCounter();
  return
}

function updateCounter() {
  minutes.textContent = state.minutes.toString().padStart(2, '0');
  seconds.textContent = state.seconds.toString().padStart(2, '0');
}
// events
play.addEventListener('click', playInit);

stop.addEventListener('click', counterStop);
