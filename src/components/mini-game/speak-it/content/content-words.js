import createDomElem from '../common';
import createWordCards from './common';
import State from '../state';

function getWordsNodes() {
  const state = State.create()
    .wordsData;
  return state.map((elem) => createWordCards(elem));
}

let instance;

class WordsField {
  get container() {
    return this.appContainer;
  }

  static create() {
    return new WordsField();
  }

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.appContainer = null;
    return this;
  }

  createContainer() {
    this.appContainer = createDomElem('div', ['speak-it__content-words']);
    return this;
  }

  addContent() {
    this.container.append(...getWordsNodes());
    return this;
  }

  updateContent() {
    this.container.textContent = '';
    this.container.append(...getWordsNodes());
  }
}

export default WordsField;
