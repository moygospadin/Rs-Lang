const { default: view } = require('./savanna-view');
const { default: getWords } = require('../../../shared/get-words');

const model = {
  answer: '',
  rightAnswer: 0,
  level: 1,
  index: 0,
  difficulty: 1,
  mistakes: 0,
  timer: 0,
  arrayOfAnswers: [],
  fidelityTimer: 0,
  getLevelDifficulty() {
    this.level = localStorage.getItem('savanna-level');
    this.difficulty = localStorage.getItem('savanna-difficulty');
    this.index = (localStorage.getItem('savanna-level') - 1) * 10;
  },
  playMusic(event) {
    event.play();
  },
  endGame() {
    view.remove(document.getElementsByClassName('fidelity-container')[0]);
    view.remove(document.getElementsByClassName('lives-container')[0]);
    clearTimeout(this.timer);
    view.remove(document.getElementsByClassName('game-words')[0]);
    view.gameResult();
    if (this.mistakes > 5) document.getElementById('next-level-btn').classList.add('disabled');
  },
  trueCheck(word) {
    clearTimeout(this.timer);

    if (word.toLowerCase() === this.answer) {
      view.showFidelity(true);
      this.rightAnswer += 1;
      this.arrayOfAnswers[this.index % 10].answer = true;
    } else {
      view.showFidelity(false);
      this.mistakes += 1;
      this.arrayOfAnswers[this.index % 10].answer = false;
    }

    if (this.index + 1 >= this.level * 10 || this.mistakes > 5) {
      view.remove(document.getElementsByClassName('game-words')[0]);
      setTimeout(() => this.endGame(), 2000);
    } else {
      this.index += 1;
      view.wordInner();
    }
  },
  async processArray() {
    let content = '';
    const rand = Math.round(Math.random() * 3);
    const createArray = (length) => Array.from({ length }, (v, k) => k);
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);
    const array = shuffle(createArray(10));
    view.spinner();
    const word = await getWords(this.index, this.difficulty);
    view.removeSpinner();
    for (let i = 0; i < 4; i += 1) {
      if (i === rand) {
        this.arrayOfAnswers.push(word[array[i]]);
        this.answer = word[array[i]].word;
        this.translate = word[array[i]].wordTranslate;
      }
      content += `<button type="button" id="word-btn" class="btn word-btn btn_gray">
       ${word[array[i]].word}</button>`;
    }
    content += `<div class="translation">${this.translate}</div>`;
    this.arrayOfAnswers[this.index % 10].answer = false;
    this.timer = setTimeout(() => {
      this.mistakes += 1;
      this.index += 1;
      view.showFidelity(false);
      if (this.index + 1 >= this.level * 10 || this.mistakes > 5) {
        view.remove(document.getElementsByClassName('game-words')[0]);
        setTimeout(() => this.endGame(), 3000);
        clearTimeout(this.timer);
      } else view.wordInner();
    }, 8000);
    return content;
  },
};

export default model;
