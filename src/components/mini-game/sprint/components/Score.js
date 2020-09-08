export default class Score {
  constructor() {
    this.score = 0;
    this.bonus = 10;
    this.series = 0;
  }

  initScore() {
    const contentScore = document.querySelector('.score');
    contentScore.firstChild.nodeValue = this.score;
  }

  renderScore() {
    const container = document.querySelector('.container');
    container.insertAdjacentHTML('afterbegin', `<h1 class="score text-center">${this.score}</h1>`);
    this.initScore();
  }

  addScore() {
    if (this.series === 30 || this.series === 110 || this.series === 270) {
      this.bonus *= 2;
      this.initMessage();
    }
    this.score += this.bonus;
    this.series += this.bonus;
    this.initScore();
  }

  initMessage() {
    const card = document.querySelector('.info');
    card.textContent = `+${this.bonus} очков за слово`;
  }

  // eslint-disable-next-line class-methods-use-this
  clearMessage() {
    const card = document.querySelector('.info');
    card.textContent = '';
  }

  cancelBonus() {
    this.bonus = 10;
    this.series = 0;
    this.clearMessage();
  }
}
