import properties from './properties';
import correctAnswer from './correctAnswer';
import showWrongAndRightLetters from './showWrongAndRightLetters';

export default function checkInput() {
  const form = document.querySelector('.word form');
  form.querySelector('input').focus();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    const inputTopLayer = document.querySelector('.input-top-layer');

    inputTopLayer.textContent = '';
    inputTopLayer.classList.remove('transparent');
    const currentWordIndex = localStorage.getItem('currentWordIndex');
    const wordArray = JSON.parse(localStorage.getItem('localAllWords'));

    if (input.value === properties.missingWord) {
      input.classList.add('input_correct');
      input.disabled = true;
      correctAnswer();

      if (wordArray[currentWordIndex].answer === 'none') {
        wordArray[currentWordIndex].answer = 'true';
        localStorage.setItem('localAllWords', JSON.stringify(wordArray));
      }
    } else {
      inputTopLayer.classList.remove('hidden');
      wordArray[currentWordIndex].answer = 'false';
      localStorage.setItem('localAllWords', JSON.stringify(wordArray));
      showWrongAndRightLetters();

      input.value = '';
      input.style.width = `${inputTopLayer.offsetWidth}px`;
      inputTopLayer.style.marginLeft = `${-input.offsetWidth - 10}px`;

      input.addEventListener('input', () => {
        inputTopLayer.classList.add('transparent');
      });

      inputTopLayer.addEventListener('click', () => {
        input.focus();
      });
    }
  });
}
