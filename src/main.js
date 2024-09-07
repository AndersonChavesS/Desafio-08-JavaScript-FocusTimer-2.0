const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const controls = document.getElementById('controls');
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
function counterInit(e) {
  play.classList.toggle('active');

  
}

function counterStop(e) {
  if (play.classList.contains('active')) {
    play.classList.remove('active');
  } else {
    return;
  }
}
// events
play.addEventListener('click', counterInit);

stop.addEventListener('click', counterStop);
