let lightMode = true;
const buttonToggle = document.getElementById('toggle-mode');
buttonToggle.addEventListener('click', (e) => {
  document.documentElement.classList.toggle('dark');
  const mode = lightMode ? 'dark' : 'light';
  e.currentTarget.querySelector('span').textContent = `${mode} mode ativado`;
  lightMode = !lightMode;
});
