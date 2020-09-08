import gamePage from './gamePage';
import createElement from '../../../shared/createElement';
import createHeader from './createHeader';

export const state = {};

class StartPage {
  constructor(createHTML, startGame) {
    this.createElement = createHTML;
    this.gameClass = startGame;
  }

  createDescription() {
    const desc = this.createElement('div', ['audiocall-description', 'game-rules']);
    const img = this.createElement('img');
    img.src = require('../../../assets/images/audiocall-2.png');
    const gameplayInfo = this.createElement('p');
    gameplayInfo.innerText = 'Listen to the word and choose the right translation.';
    const hintInfo = this.createElement('p');
    hintInfo.innerText = 'Difficult? Use a hint: listen to the meaning of the word.';
    const scoresInfo = this.createElement('p', 'info');
    scoresInfo.innerText = 'You get 2 points for the right answer, 1 point for the right answer with hint and 0 for the wrong answer.';
    desc.append(img, gameplayInfo, hintInfo, scoresInfo, this.createButton());
    return desc;
  }

  createButton() {
    const button = this.createElement('button', ['btn', 'btn-primary']);
    button.innerText = 'Start';
    button.addEventListener('click', this.startGame.bind(this));
    return button;
  }

  async createPage() {
    const root = document.querySelector('.root');
    const container = this.createElement('div', ['container', 'audio-call']);
    container.append(this.createDescription());
    root.append(container);
  }

  startGame() {
    this.gameClass.init.call(this.gameClass);
  }
}

export const startPage = new StartPage(createElement, gamePage);
