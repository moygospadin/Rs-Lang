export default function saveSettingsToLocalStorage() {
  localStorage.setItem('wordsLimit', document.querySelector('.words-limit').value);
  localStorage.setItem('cardsLimit', document.querySelector('.cards-limit').value);

  document.querySelectorAll('.settings-to-save').forEach((setting) => {
    localStorage.setItem(setting.getAttribute('name'), setting.checked);
  });
}
