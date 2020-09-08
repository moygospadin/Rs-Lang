import properties from '../learningWords/properties';

export default function updateProperties() {
  const settingsObj = properties.settings;

  settingsObj.wordsPerDay = document.querySelector('.words-limit').value;
  settingsObj.optional.cardsLimit = document.querySelector('.cards-limit').value;

  document.querySelectorAll('.settings-to-save').forEach((setting) => {
    settingsObj.optional[setting.getAttribute('name')] = setting.checked;
  });
}
