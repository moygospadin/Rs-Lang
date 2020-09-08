import createElement from '../../shared/createElement';
import { getAmountOfDoneCards } from './updateAmountOfDoneCards';

function createBar() {
  const cardsLimit = localStorage.getItem('cardsLimit') || 50;
  const doneCards = getAmountOfDoneCards();
  const amount = (doneCards * 100) / cardsLimit > 100 ? 100 : (doneCards * 100) / cardsLimit;
  const attrs = [['role', 'progressbar'], ['aria-valuenow', `${amount}`], ['aria-valuemin', '0'], ['aria-valuemax', '100']];
  const bar = createElement('div', ['progress-bar', 'bg-success'], attrs);
  bar.style.width = `${amount}%`;
  return bar;
}

function createProgressBar() {
  const wrapper = createElement('div', 'progress-bar-wrapper');
  const doneCards = createElement('p', 'cards-amount-done');
  doneCards.textContent = getAmountOfDoneCards();
  const cardsToDo = createElement('p', 'cards-amount-all');
  cardsToDo.textContent = localStorage.getItem('cardsLimit') || 80;
  const cardsNumbersWrapper = createElement('div', 'cards-numbers-wrapper');
  cardsNumbersWrapper.append(doneCards, cardsToDo);
  const barWrapper = createElement('div', 'progress');
  barWrapper.append(createBar());
  wrapper.append(cardsNumbersWrapper, barWrapper);
  return wrapper.outerHTML;
}

export default createProgressBar;
