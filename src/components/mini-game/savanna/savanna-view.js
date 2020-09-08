import model from './savanna-model';

const view = {
  showFidelity(bool) {
    clearTimeout(model.fidelityTimer);
    view.remove(document.getElementsByClassName('fidelity-container')[0]);
    let content = '';
    if (bool) {
      content = `<div class="fidelity"><svg class="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
    <g><path d="M990,193.4c-2.9,2-6.2,3.5-8.6,6C762.8,428.9,544.2,658.5,325.6,888.2c-1.1,1.1-1.8,2.5-2.7,3.8c-1.1,0-2.1,0-3.2,0c-1.8-2.5-3.4-5.2-5.5-7.4C215.7,780.8,117,677,18.3,573.3c-2.5-2.6-5.5-4.6-8.3-6.9c0-1.1,0-2.1,0-3.2c27.2-24.8,54.4-49.6,83-75.5c73,76.7,150.5,158.1,230.1,241.6c3.4-4.6,5.9-8.8,9.1-12.2c191.6-201.4,383.3-402.7,575-604.1c1.4-1.5,2.5-3.3,3.8-5c1.1,0,2.1,0,3.2,0c25.3,26.3,50.6,52.7,75.9,79C990,189.1,990,191.2,990,193.4z"/></g>
    </svg></div>`;
    } else {
      content = `<div class="fidelity"><svg class="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
    <g><path d="M990,852.1l-352.3-353l349.9-349.9L841,2.5L491.3,352.3L168.2,28.4l-145,145.4l322.9,323.6L10,833.6l146.6,146.6l335.9-335.9L845,997.5L990,852.1z"/></g>
    </svg></div>`;
    }
    document
      .getElementsByClassName('fidelity-container')[0]
      .insertAdjacentHTML('afterbegin', content);
    model.fidelityTimer = setTimeout(
      () => view.remove(document.getElementsByClassName('fidelity-container')[0]),
      3000,
    );
  },
  changeLevelDifficulty() {
    this.remove(document.getElementsByClassName('level-difficulty')[0]);
    const content = `<span>level: ${localStorage.getItem(
      'savanna-level',
    )}  difficulty:${localStorage.getItem('savanna-difficulty')}</span>`;
    document
      .getElementsByClassName('level-difficulty')[0]
      .insertAdjacentHTML('afterbegin', content);
  },
  gameResult() {
    let contentFalse = `<div class="content-false"><span>FALSE: ${model.mistakes}</span>`;
    let contentTrue = `<div class="content-true"><span>TRUE: ${model.rightAnswer}</span>`;
    const page = document.querySelector('.game-words');
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

    const nextLevelBtn = `<button type="button" id="next-level-btn" class="btn btn_yellow ${(model.level >= 6 || model.mistakes >= 5) ? 'disabled' : ''} ">Next Level</button>`;
    const nextDifficultyBtn = `<button type="button" id="next-difficulty-btn" class="btn btn_yellow ${(model.level >= 6 || model.mistakes >= 5) ? 'disabled' : ''}">Next Difficulty</button>`;
    const buttons = `<div class="btn-next-repeat">
    <div class="savanna__buttons">${nextLevelBtn}
    ${nextDifficultyBtn}</div>
    <div class="savanna__buttons"><button type="button" id="repeat-level-btn" class="btn  btn_yellow">Repeat</button>
    <button type="button" id="game-menu-btn" class="btn  btn_yellow">menu</button></div>
    </div>`;
    ul.insertAdjacentHTML('beforeend', contentTrue + contentFalse + buttons);
  },
  async generateGameLayout() {
    model.getLevelDifficulty();
    const page = document.querySelector('.savanna-game-wrapper');
    const gameLayout = document.createElement('div');
    gameLayout.classList.add('game-layout', 'mx-auto');
    const gameWords = document.createElement('div');
    const spinnerContainer = document.createElement('div');
    const fidelityContainer = document.createElement('div');
    fidelityContainer.classList.add('fidelity-container');
    spinnerContainer.classList.add('spinner-container', 'mx-auto');
    gameWords.classList.add('game-words', 'mx-auto');
    gameLayout.insertAdjacentElement('beforeend', spinnerContainer);
    gameLayout.insertAdjacentElement('beforeend', fidelityContainer);
    gameLayout.insertAdjacentElement('beforeend', gameWords);
    this.innerContent(gameLayout, page);
    this.preparationPage();
  },
  lives() {
    const lives = document.createElement('div');
    lives.classList.add('lives-container');
    document
      .getElementsByClassName('game-layout')[0]
      .insertAdjacentElement('afterbegin', lives);
  },
  livesInner() {
    const lives = document.getElementsByClassName('lives-container')[0];
    let content = '';
    for (let i = 0; i <= model.mistakes - 1; i += 1) {
      content += `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>`;
    }
    for (let i = 0; i <= 4 - model.mistakes; i += 1) {
      content += `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>`;
    }
    lives.insertAdjacentHTML('afterbegin', content);
  },
  innerContent(gameLayout, page) {
    this.remove(page);
    page.insertAdjacentElement('beforeend', gameLayout);
  },
  async wordInner() {
    const gameWords = document.getElementsByClassName('game-words')[0];
    this.remove(gameWords);
    this.remove(document.getElementsByClassName('lives-container')[0]);
    this.livesInner();
    const content = await model.processArray();
    gameWords.insertAdjacentHTML('beforeend', content);
    setTimeout(
      () => document
        .getElementsByClassName('translation')[0]
        .classList.add('translation-move'),
      100,
    );
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
    let index = 3;
    const gameWords = document.getElementsByClassName('game-words')[0];
    this.remove(gameWords);

    const timer = document.createElement('span');
    timer.classList.add('timer');
    this.spinner();
    document
      .getElementsByClassName('spinner-border')[0]
      .insertAdjacentElement('beforebegin', timer);
    timer.innerText = index;
    const interval = setInterval(() => {
      index -= 1;
      timer.innerText = index;
      if (index <= 0) {
        clearInterval(interval);
        this.removeSpinner();
        this.lives();
        this.wordInner();
      }
    }, 1000);
  },
};
export default view;
