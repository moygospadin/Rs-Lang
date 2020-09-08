import model from './our-game-model';

const view = {
  gameResult() {
    let contentFalse = `<div class="content-false"><span>FALSE: ${model.mistakes}</span>`;
    let contentTrue = `<div class="content-true"><span>TRUE: ${model.rightAnswers}</span>`;
    const page = document.querySelector('.our-game-wrapper');
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    page.insertAdjacentElement('afterbegin', ul);
    model.arrayOfAnswers.forEach((el) => {
      if (el.answer) {
        contentTrue += `
        <li class="list-group-item">
        <span class="el-word">${el.word}</span>
        <span class="el-transcription">${el.transcription}</span>
        <span class="el-translate">${el.wordTranslate}</span>
          <button id="play-btn" type="button" class="btn btn-dark">
            <audio id="audiotag1" src="${el.audio}" preload="auto"></audio>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi id="play-btn-1" bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
             <path id="play-btn-2" d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
          </button>
          </li>`;
      } else {
        contentFalse += `
        <li class="list-group-item">
<span class="el-word">${el.word}</span>
<span class="el-transcription">${el.transcription}</span>
<span class="el-translate">${el.wordTranslate}</span>
  <button id="play-btn" type="button" class="btn btn-dark">
    <audio id="audiotag1" src="${el.audio}" preload="auto"></audio>
    <svg width="1em" height="1em" viewBox="0 0 16 16" id="play-btn-1" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path id="play-btn-2" d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
    </svg>
  </button>
</li>`;
      }
    });
    contentFalse += '</div>';
    contentTrue += '</div>';

    const buttons = `<div class="btn-next-menu">
    <button type="button" id="game-menu-btn" class="btn  btn_yellow btn_small">Menu</button>
    <button type="button" id="repeat-level-btn" class="btn  btn_yellow btn_small">Repeat Lvl</button>
    </div>`;
    ul.insertAdjacentHTML('beforeend', contentTrue + contentFalse + buttons);
  },
  screenAlert(bool) {
    const screen = `<div class=" ${
      bool ? 'screen-green' : 'screen-red'
    } "><div>`;
    document.querySelector('.screen').insertAdjacentHTML('beforeend', screen);
    setTimeout(() => view.remove(document.querySelector('.screen')), 2000);
  },
  changeLevelDifficulty() {
    this.remove(document.getElementsByClassName('level-difficulty')[0]);
    const content = `<span>level: ${localStorage.getItem(
      'our-game-level',
    )}  difficulty:${localStorage.getItem('our-game-difficulty')}</span>`;
    document
      .getElementsByClassName('level-difficulty')[0]
      .insertAdjacentHTML('afterbegin', content);
  },
  generateGameLayout() {
    model.getLevelDifficulty();
    model.wordsShuffle();
    const page = document.querySelector('.our-game-wrapper');
    const gameLayout = document.createElement('div');

    gameLayout.classList.add('game-layout', 'mx-auto');
    const gameWords = document.createElement('div');
    const spinnerContainer = document.createElement('div');
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container', 'mx-auto');
    spinnerContainer.classList.add('spinner-container', 'mx-auto');
    gameWords.classList.add('game-words', 'mx-auto');
    gameLayout.insertAdjacentElement('beforeend', timerContainer);
    gameLayout.insertAdjacentElement('beforeend', spinnerContainer);
    gameLayout.insertAdjacentElement('beforeend', gameWords);
    const screen = document.createElement('div');
    screen.classList.add('screen');
    gameLayout.insertAdjacentElement('beforeend', screen);
    this.remove(page);
    page.insertAdjacentElement('beforeend', gameLayout);
    this.preparationPage();
  },
  async generateSideLayout() {
    const sideContainer = document.createElement('div');
    const greenSide = document.createElement('div');
    const redSide = document.createElement('div');

    const closeBtn = `<a id="game-menu-btn" class="btn btn-secondary btn-close active btn-close-svg" role="button" aria-pressed="true">
    <svg id="game-menu-btn" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path id="game-menu-btn" fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
  <path id="game-menu-btn" fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
</svg>
</a>`;
    document
      .querySelector('.game-layout')
      .insertAdjacentHTML('afterbegin', closeBtn);
    greenSide.classList.add('green-side', 'our-side');
    redSide.classList.add('red-side', 'our-side');
    sideContainer.classList.add('side-container');
    document
      .querySelector('.game-layout')
      .insertAdjacentElement('beforeend', sideContainer);
    sideContainer.insertAdjacentElement('afterbegin', redSide);
    sideContainer.insertAdjacentElement('afterbegin', greenSide);
    const wordRed = document.createElement('p');
    const buttonRed = '<button type="button" id="btn-red"  class="btn side-btn btn-danger">→</button>';
    wordRed.classList.add('word-red');
    const wordGreen = document.createElement('p');
    const buttonGreen = '<button type="button" id="btn-green" class="btn side-btn btn-success">←</button>';
    wordGreen.classList.add('word-green');
    redSide.insertAdjacentElement('afterbegin', wordRed);
    redSide.insertAdjacentHTML('beforeend', buttonRed);
    greenSide.insertAdjacentElement('afterbegin', wordGreen);
    greenSide.insertAdjacentHTML('beforeend', buttonGreen);
  },
  remove(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  },
  spinner() {
    const spinnerContainer = document.getElementsByClassName(
      'spinner-container',
    )[0];
    const spinner = `
    <div class="spinner-border" role="status">
    <span class="sr-only"></span>
  </div>`;
    spinnerContainer.insertAdjacentHTML('beforeend', spinner);
  },
  removeSpinner() {
    this.remove(document.getElementsByClassName('spinner-container')[0]);
  },
  preparationPage() {
    const index = 3;
    const gameWords = document.getElementsByClassName('game-words')[0];
    this.remove(gameWords);
    this.timer(index, 1000);
  },
  timer(index, time) {
    const timer = document.createElement('span');
    timer.classList.add('timer');
    this.spinner();
    document
      .getElementsByClassName('spinner-border')[0]
      .insertAdjacentElement('beforebegin', timer);
    timer.innerText = index;
    const interval = setInterval(() => {
      // eslint-disable-next-line
      index -= 1;
      timer.innerText = index;
      if (index <= 0) {
        clearInterval(interval);
        this.removeSpinner();
        this.generateSideLayout();
        model.timer();
        model.wordInner();
      }
    }, time);
  },
};

export default view;
