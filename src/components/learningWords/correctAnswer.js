import goToTheNextWord from './goToTheNextWord';
import properties from './properties';
import playAudio from './pronunciation/playAudio';
import checkWordAndPage from './checkWordAndPage';
import showTranslation from './showTranslation';
import { updateAmountOfDoneCards } from './updateAmountOfDoneCards';
import showMessage from './showMessage';
import showStatistic from './showStatistic';
import saveLearnedWords from './saveLearnedWords/saveLearnedWords';

export default async function correctAnswer() {
  await saveLearnedWords();
  if (properties.sound) {
    await playAudio();
    return;
  }
  showTranslation();
  await checkWordAndPage();
  goToTheNextWord();
  let currentWordIndex = localStorage.getItem('currentWordIndex');
  // eslint-disable-next-line
  currentWordIndex++;
  localStorage.setItem('currentWordIndex', currentWordIndex);
  showMessage();
  showStatistic();
  updateAmountOfDoneCards();
  document.querySelector('.submit-btn').classList.add('hidden');
  document.querySelector('.next-btn').classList.remove('hidden');
  document.querySelector('.show-answer-btn').classList.add('hidden');
  document.querySelector('.input-top-layer').classList.add('hidden');
}
