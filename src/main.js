const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const increment = document.querySelector('.plus');
const decrement = document.querySelector('.minus');
const controls = document.getElementById('controls');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const allSoundsCards = document.querySelectorAll('#cards-sounds');
const forestSoundCard = document.querySelector('.card-forest-sound');
const soundOfRainCard = document.querySelector('.card-sound-of-rain');
const coffeShopSoundCard = document.querySelector('.card-coffe-shop-sound');
const firePlaceSoundCard = document.querySelector('.card-fire-place-sound');

// allSounds
const allSounds = {
  alarm: new Audio('../assets/kichen-timer.mp3'),
  clickButton: new Audio('../assets/button-press.wav'),
  forestSound: new Audio('../assets/Floresta.wav'),
  soundOfRain: new Audio('../assets/Chuva.wav'),
  coffeShopSound: new Audio('../assets/Cafeteria.wav'),
  firePlaceSound: new Audio('../assets/Lareira.wav'),
};

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
  allSounds.clickButton.play();
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
      if (state.seconds === 0 && state.minutes === 0) {
        state.minutes = 25;
        state.seconds = 0;
        allSounds.alarm.play();
        counterStop();
        return;
      }
      if (state.minutes < 0) {
        state.minutes = 25;
        state.seconds = 0;
        counterStop();
        return;
      }

      updateCounter();

      return;
    }, 1000);
  }
}

function counterStop() {
  play.classList.remove('active');
  allSounds.clickButton.play();
  clearTimeout(state.countdownId);
  state.isActive = false;
  state.minutes = 25;
  state.seconds = 0;
  updateCounter();
  return;
}

function updateCounter() {
  minutes.textContent = state.minutes.toString().padStart(2, '0');
  seconds.textContent = state.seconds.toString().padStart(2, '0');
}

function addFiveMinutes() {
  allSounds.clickButton.play();
  state.minutes += 5;
  updateCounter();
}

function removeFiveMinutes() {
  allSounds.clickButton.play();
  if (state.minutes <= 0 && state.seconds === 0) return;

  state.minutes -= 5;
  updateCounter();
}

function toggleMusic() {
  allSounds.clickButton.play();
  allSoundsCards.forEach((sound) => sound.classList.remove('active'));
  this.classList.toggle('active');

  if (
    this.classList.contains('card-forest-sound') &&
    this.classList.contains('active')
  ) {
    allSounds.forestSound.play();
    allSounds.soundOfRain.pause();
    allSounds.coffeShopSound.pause();
    allSounds.firePlaceSound.pause();
    allSounds.forestSound.loop = true;
  } else {
    allSounds.forestSound.pause();
  }

  if (
    this.classList.contains('card-sound-of-rain') &&
    this.classList.contains('active')
  ) {
    allSounds.soundOfRain.play();
    allSounds.forestSound.pause();
    allSounds.coffeShopSound.pause();
    allSounds.firePlaceSound.pause();
    allSounds.soundOfRain.loop = true;
  } else {
    allSounds.soundOfRain.pause();
  }

  if (
    this.classList.contains('card-coffe-shop-sound') &&
    this.classList.contains('active')
  ) {
    allSounds.coffeShopSound.play();

    allSounds.forestSound.pause();
    allSounds.soundOfRain.pause();
    allSounds.firePlaceSound.pause();
    allSounds.coffeShopSound.loop = true;
  } else {
    allSounds.coffeShopSound.pause();
  }

  if (
    this.classList.contains('card-fire-place-sound') &&
    this.classList.contains('active')
  ) {
    allSounds.firePlaceSound.play();
    allSounds.forestSound.pause();
    allSounds.soundOfRain.pause();
    allSounds.coffeShopSound.pause();
    allSounds.firePlaceSound.loop = true;
  } else {
    allSounds.firePlaceSound.pause();
  }
}

// events
play.addEventListener('click', playInit);
stop.addEventListener('click', counterStop);
increment.addEventListener('click', addFiveMinutes);
decrement.addEventListener('click', removeFiveMinutes);
forestSoundCard.addEventListener('click', toggleMusic);
soundOfRainCard.addEventListener('click', toggleMusic);
coffeShopSoundCard.addEventListener('click', toggleMusic);
firePlaceSoundCard.addEventListener('click', toggleMusic);
