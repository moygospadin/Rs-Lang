import getDate from '../../shared/getDate';

export default async function setSettingsToLocalStorage(settings) {
  localStorage.setItem('wordsLimit', settings.wordsPerDay);
  const newSettings = settings;
  if (newSettings.optional.doneCards && getDate() === newSettings.optional.doneCards.slice(0, 10)) {
    newSettings.optional.doneCards = newSettings.optional.doneCards.slice(11);
  }
  newSettings.optional.currentWord = 0;
  for (const key in settings.optional) {
    if (Object.prototype.hasOwnProperty.call(settings.optional, key)) {
      localStorage.setItem(key, settings.optional[key]);
    }
  }
}
