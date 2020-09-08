import getDate from '../../shared/getDate';

function updateAmountOfDoneCards() {
  const today = getDate();
  let doneCards;
  let date;
  if (localStorage.getItem('doneCards')) {
    [date, doneCards] = localStorage.getItem('doneCards').split(',');
  }
  if (date !== today) {
    date = today;
    doneCards = 0;
  }
  doneCards = Number(doneCards) + 1;
  localStorage.setItem('doneCards', [date, doneCards]);
  const cardsLimit = localStorage.getItem('cardsLimit') || 80;
  const amount = ((doneCards * 100) / cardsLimit) > 100 ? 100 : (doneCards * 100) / cardsLimit;
  const bar = document.querySelector('.progress-bar');
  const cardsAmountDone = document.querySelector('.cards-amount-done');
  cardsAmountDone.textContent = doneCards;
  bar.setAttribute('aria-valuenow', amount);
  bar.style.width = `${(doneCards * 100) / cardsLimit}%`;
}

function getAmountOfDoneCards() {
  const today = getDate();
  if (localStorage.getItem('doneCards')) {
    const [date, amountOfCards] = localStorage.getItem('doneCards').split(',');
    return today === date ? Number(amountOfCards) : 0;
  }
  return 0;
}
export { getAmountOfDoneCards, updateAmountOfDoneCards };
