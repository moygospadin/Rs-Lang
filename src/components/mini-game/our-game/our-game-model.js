const { default: view } = require('./our-game-view');

const model = {
  level: 0,
  difficulty: 0,
  words: [],
  index: 0,
  answer: 0,
  mistakes: 0,
  arrayOfAnswers: [],
  rightAnswers: 0,
  timerGameEnd: 0,
  gameDuration: 60,
  forTimer: 2.08,
  forTimer2: 125,
  timerInterval: 0,
  playMusic(event) {
    event.play();
  },
  timer() {
    const timerContainer = document.querySelector('.timer-container');
    const timerContent = `<div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="20"></circle>
        <path id="base-timer-path-remaining" stroke-dasharray="125 125" class="base-timer__path-remaining green" d="
          M 50, 50
          m -20, 0
          a 20,20 0 1,0 40,0
          a 20,20 0 1,0 -40,0
        "></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">60</span>
  </div>`;
    let baseTimerContent = '';
    timerContainer.insertAdjacentHTML('beforeend', timerContent);
    this.timerInterval = setInterval(() => {
      this.gameDuration -= 1;
      this.forTimer2 -= this.forTimer;
      view.remove(timerContainer);
      baseTimerContent = `<div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="20"></circle>
          <path id="base-timer-path-remaining" stroke-dasharray="${this.forTimer2} 125" class="base-timer__path-remaining green" d="
            M 50, 50
            m -20, 0
            a 20,20 0 1,0 40,0
            a 20,20 0 1,0 -40,0
          "></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${this.gameDuration}</span>
    </div>`;

      timerContainer.insertAdjacentHTML('afterbegin', baseTimerContent);
    }, 1000);
    this.timerGameEnd = setTimeout(() => {
      clearInterval(this.timerInterval);
      view.remove(timerContainer);
      this.mistakes += 1;
      this.gameEnd();
    }, 60000);
  },
  gameEnd() {
    clearInterval(this.timerInterval);
    clearTimeout(this.timerGameEnd);
    view.remove(document.querySelector('.side-container'));
    view.remove(document.querySelector('.game-words'));
    view.remove(document.querySelector('.screen'));
    view.remove(document.querySelector('.timer-container'));
    document.querySelector('.btn-close').remove();

    view.gameResult();
  },
  trueCheck(bool) {
    if (this.answer === bool) {

      this.rightAnswers += 1;
      view.screenAlert(true);
      this.arrayOfAnswers[this.arrayOfAnswers.length - 1].answer = true;
    } else {
      this.mistakes += 1;
      view.screenAlert(false);
    }
    if (this.index >= 19) {
      clearInterval(this.timerInterval);
      setTimeout(() => this.gameEnd(), 1000);
    } else {
      this.index += 1;
      setTimeout(() => this.wordInner(), 2000);
    }
  },
  getLevelDifficulty() {
    this.level = localStorage.getItem('our-game-level');
    this.level -= 1;
    this.difficulty = localStorage.getItem('our-game-difficulty');
    this.difficulty -= 1;
  },
  formatData(data) {
    return data.map((elem) => {
      const newElem = elem;
      const { image, audio } = newElem;
      newElem.image = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${image}`;
      newElem.audio = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${audio}`;
      return elem;
    });
  },
  async getWords(page, group) {
    try {
      const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = Array.from(await res.json());
        return this.formatData(data);
      }
      throw new Error(`${res.status}`);
    } catch (e) {
      return e.toString();
    }
  },
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line
      [array[i], array[j]] = [array[j], array[i]];
    }
  },
  async wordsShuffle() {
    this.words = await this.getWords(this.level, this.difficulty);
    this.shuffle(this.words);
  },
  wordInner() {
    this.answer = Math.round(Math.random());
    const wordAnswer = this.words[this.index + this.answer];
    wordAnswer.answer = false;
    this.arrayOfAnswers.push(wordAnswer);
    view.remove(document.querySelector('.word-red'));
    view.remove(document.querySelector('.word-green'));
    view.remove(document.querySelector('.game-words'));
    document
      .querySelector('.word-red')
      .insertAdjacentHTML(
        'afterbegin',
        `${this.words[this.index].textMeaning.replace(/\<.*\>/, '...')}`,
      );
    this.index += 1;
    document
      .querySelector('.word-green')
      .insertAdjacentHTML(
        'afterbegin',
        `${this.words[this.index].textMeaning.replace(/\<.*\>/, '...')}`,
      );
    const learnWord = document.createElement('p');
    learnWord.classList.add('learn-word');
    document
      .querySelector('.game-words')
      .insertAdjacentElement('afterbegin', learnWord);

    learnWord.insertAdjacentHTML('afterbegin', wordAnswer.word);
  },
};
export default model;
