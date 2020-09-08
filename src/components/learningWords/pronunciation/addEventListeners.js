import properties from '../properties';
import saveLearnedWords from '../saveLearnedWords/saveLearnedWords';

export default function addEventListeners() {
  const soundIcon = document.querySelector('.sound-block__sound-icon');
  soundIcon.addEventListener('click', () => {
    document.querySelector('.sound-on').classList.toggle('hidden');
    document.querySelector('.sound-off').classList.toggle('hidden');
    properties.sound = !(properties.sound === true);
  });
  const btns = document.querySelectorAll('.set-difficulty');
  Array.prototype.forEach.call(btns, (el) => {
    el.addEventListener('click', (e) => {
      properties.difficulty = e.target.dataset.difficulty;
    });
  });
  const difficultBtn = document.querySelector('.add-to-difficult');
  difficultBtn.addEventListener('click', (e) => {
    saveLearnedWords(e.target.dataset.value);
  });
}
