import createElement from '../../../shared/createElement';

export default function renderHubPage(info) {
  const hubPageWrapper = createElement('div', 'hub-page');
  hubPageWrapper.insertAdjacentHTML('beforeend',
    `<div class="hub__wrapper">
      <div class="hub__user-info">
        <span class="user-email">${info.userEmail}</span>
        <a href="#/settings" class="user-settings">
          <svg class="bi bi-gear-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="#ffc727" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"/>
          </svg>
        </a>
      </div>
      <div class="hub__main-blocks">
      <div class="hub__main-block">
      <div class="image">
      <img src=${require('../../../assets/images/hub-2.png')}>
      </div>
      <div class="description">
      <p>Improve your <b>skills</b> by learning <b>new words</b></p>
      <a href="#/learning" class="btn btn_small btn_yellow" role="button">Learn</a>
      </div>
      </div>
      <div class="hub__main-block">
      <div class="image">
      <img src=${require('../../../assets/images/hub-1.png')}>
      </div>
      <div class="description">
      <p>Challange yourself & set <b>new records</br></p>
      <a href="#/games" class="btn btn_small btn_yellow" role="button">Play</a>
      </div>
      </div>
      </div>
      <div class="hub__info_current">
          <h3>Today:</h3>
          <div class="current-info__words">
              <p class="words__per-day">Words to practice:<span><br>${info.wordsPerDay}</span></p>
              <p class="words__practiced">Words practiced:<span><br>${info.wordsPracticed}</span></p>
              <p class="words__learned">Total learned:<span><br>${info.wordsLearned}</span></p>
          </div>
      </div>
      <div class="hub__info_total">
      <div class="description">
      <p class="title">Todays goal:</p>
      <p class="cards-count_completed"><span>${info.cardsCompleted} </span>/ ${info.cardsPerDay}</p>
      <p class="title">Words learned:</p>
      <p class="cards-count_completed"><span>${info.wordsLearned} </span>/ ${info.wordsAll}</p>
      </div>
      </div>
    </div>`);
  return hubPageWrapper;
}
