import createDomElem, { getRandomInt } from '../../common';

let instance;

class WordsPuzzle {
  get container() {
    return this.appContainer;
  }

  constructor() {
    if (instance) {
      return instance;
    }
    this.appContainer = null;
    this.words = null;
    instance = this;
    return this;
  }

  static create() {
    return new WordsPuzzle();
  }

  getWords() {
    return this.words;
  }

  setWords(str) {
    this.words = str;
    return this;
  }

  createContainer() {
    this.appContainer = createDomElem('div', ['content__words-list']);
    return this;
  }

  cleanContainer() {
    this.appContainer.innerHTML = '';
    return this;
  }

  addContent() {
    const wordsArr = this.words.split(' ');
    const numbers = new Set();
    const first = 0;
    while (numbers.size !== wordsArr.length) {
      const num = getRandomInt(first, wordsArr.length);
      numbers.add(num);
    }
    Array.from(numbers).forEach((num) => {
      const firstPart = createDomElem('div', ['shape-part']);
      const lastPart = createDomElem('div', ['shape-part']);
      const word = createDomElem(
        'div',
        ['content__words-item', 'puzzle-shape'],
        [wordsArr[num], firstPart, lastPart],
        [['data-action', 'in-field'], ['draggable', 'true']],
      );
      this.container.append(word);
    });
    return this;
  }

  addMessage(str) {
    if (str) {
      this.container.textContent = str[0].toUpperCase() + str.substring(1);
    }
  }
}

export default WordsPuzzle;
