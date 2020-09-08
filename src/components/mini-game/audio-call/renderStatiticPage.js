import createHeader from './createHeader';
import '../../../assets/icons/speaker.svg';
import createElement from '../../../shared/createElement';

function createStatsItem(el) {
  const statsItem = createElement('li', 'audio-call__statistics-item');
  const speaker = createElement('img', 'audio-call__small-icon');
  speaker.src = 'images/speaker.svg';
  const audio = new Audio();
  audio.src = el.audio;
  speaker.addEventListener('click', () => {
    audio.play();
  });
  const word = createElement('p');
  word.textContent = `${el.word} \u2013 `;
  const translation = createElement('p');
  translation.textContent = ` ${el.wordTranslate}`;
  statsItem.append(speaker, word, translation);
  return statsItem;
}

export default function renderStatisticPage(gameResults) {
  const h2 = createElement('h2', 'audio-call__title');
  h2.textContent = 'Your statistics:';
  const score = createElement('p', 'audio-call__score');
  score.textContent = `Score: ${this.score}`;
  const page = createElement('div', 'audio-call__statistics');
  page.append(createHeader(), h2, score);
  if (gameResults.rightAnswers.length) {
    const rightAnswersTitle = createElement('h3', 'audio-call__list-title');
    rightAnswersTitle.textContent = 'Right answers:';
    const rightAnswers = createElement('ul', 'audio-call__statistics-list');
    rightAnswers.append(...gameResults.rightAnswers.map(createStatsItem));
    const firstBlock = createElement('div', 'audio-call__statitics-block');
    firstBlock.append(rightAnswersTitle, rightAnswers);
    page.append(firstBlock);
  }
  if (gameResults.wrongAnswers.length) {
    const wrongAnswersTitle = createElement('h3', 'audio-call__list-title');
    wrongAnswersTitle.textContent = 'Wrong answers:';
    const wrongAnswers = createElement('ul', 'audio-call__statistics-list');
    wrongAnswers.append(...gameResults.wrongAnswers.map(createStatsItem));
    const secondBlock = createElement('div', 'audio-call__statitics-block');
    secondBlock.append(wrongAnswersTitle, wrongAnswers);
    page.append(secondBlock);
  }
  const gameButton = document.querySelector('.audio-call__game-button');
  gameButton.textContent = 'Next round';
  gameButton.dataset.value = 'Next round';
  page.append(gameButton);
  const container = document.querySelector('.container.audio-call');
  container.innerHTML = '';
  container.append(page);
}
