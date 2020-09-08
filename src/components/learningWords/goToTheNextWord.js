import setInputWidth from './setInputWidth';
import createAudioObjects from './pronunciation/createAudioObjects';
import fillCardDueToSettings from './fillCardDueToSettings';
import properties from './properties';
import createUserWord from '../../services/createUserWord';

export default function goToTheNextWord() {
  const nextBtn = document.querySelector('.next-btn');
  const currentWordIndex = localStorage.getItem('currentWordIndex');

  nextBtn.addEventListener('click', () => {
    const wordArray = JSON.parse(localStorage.getItem('localAllWords'));
    if (wordArray[currentWordIndex].answer === 'none') {
      wordArray[currentWordIndex].answer = 'false';
    }

    localStorage.setItem('localAllWords', JSON.stringify(wordArray));
    const submitBtn = document.querySelector('.submit-btn');
    const showAnswerBtn = document.querySelector('.show-answer-btn');
    const toCleanBlocksClasses = ['sentence', 'meaning', 'translation-input', 'sentence-translation', 'word__translation', 'meaning-translation'];

    submitBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    showAnswerBtn.classList.remove('hidden');

    document.querySelector('.input-top-layer').classList.remove('transparent');
    createAudioObjects();
    toCleanBlocksClasses.forEach((className) => {
      document.querySelector(`.${className}`).textContent = '';
    });
    fillCardDueToSettings();
    setInputWidth();
  });
}
