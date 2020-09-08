import properties from '../properties';
import checkWordAndPage from '../checkWordAndPage';
import goToTheNextWord from '../goToTheNextWord';
import showTranslation from '../showTranslation';
import { updateAmountOfDoneCards } from '../updateAmountOfDoneCards';

function switchOffForm(e) {
  e.stopImmediatePropagation();
  e.preventDefault();
}

export default async function playAudio() {
  const settings = properties.settings.optional;
  properties.currentWordPronunciation.play();
  const htmlDoc = document.querySelector('html');
  htmlDoc.addEventListener('keydown', switchOffForm, true);
  htmlDoc.addEventListener('click', switchOffForm, true);
  showTranslation();
  document.querySelector('.submit-btn').classList.add('hidden');
  document.querySelector('.next-btn').classList.remove('hidden');
  document.querySelector('.input-top-layer').classList.add('hidden');
  await checkWordAndPage();
  updateAmountOfDoneCards();
  goToTheNextWord();
  if (!(String(settings.playWordExample) === 'true') && !(String(settings.playWordMeaning) === 'true')) {
    properties.currentWordPronunciation.onended = async () => {
      htmlDoc.removeEventListener('keydown', switchOffForm, true);
      htmlDoc.removeEventListener('click', switchOffForm, true);
    };
    return;
  }
  if (String(settings.playWordExample) === 'true' && !(String(settings.playWordMeaning) === 'true')) {
    properties.currentWordPronunciation.onended = () => {
      properties.currentWordExample.play();
    };
    properties.currentWordExample.onended = async () => {
      htmlDoc.removeEventListener('keydown', switchOffForm, true);
      htmlDoc.removeEventListener('click', switchOffForm, true);
    };
    return;
  }
  if (String(settings.playWordExample) === 'true' && String(settings.playWordMeaning) === 'true') {
    properties.currentWordPronunciation.onended = () => {
      properties.currentWordExample.play();
    };
    properties.currentWordExample.onended = () => {
      properties.currentWordMeaning.play();
    };
    properties.currentWordMeaning.onended = async () => {
      htmlDoc.removeEventListener('keydown', switchOffForm, true);
      htmlDoc.removeEventListener('click', switchOffForm, true);
    };
    return;
  }
  properties.currentWordPronunciation.onended = () => {
    properties.currentWordMeaning.play();
  };
  properties.currentWordMeaning.onended = async () => {
    htmlDoc.removeEventListener('keydown', switchOffForm, true);
    htmlDoc.removeEventListener('click', switchOffForm, true);
  };
}
