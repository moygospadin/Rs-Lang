import correctAnswer from './correctAnswer';
import properties from './properties';

export default function showAnswer() {
  const showAnswerBtn = document.querySelector('.show-answer-btn');
  properties.difficulty = 'very hard';
  showAnswerBtn.addEventListener('click', () => {
    const input = document.querySelector('form input');
    input.value = properties.missingWord;
    input.classList.add('input_show-answer');
    correctAnswer();
    showAnswerBtn.classList.add('hidden');
  });
}
