import createDomElem from '../../common';
import Tips from './tips';
// eslint-disable-next-line import/no-cycle
import Field from './field';
import WordsPuzzle from './words-puzzle';
import Buttons from './buttons';
// eslint-disable-next-line import/no-cycle
import actions from './action';
// eslint-disable-next-line import/no-cycle
import {
  // eslint-disable-next-line import/named
  handleDragEnd,
  handleDragOver,
  handleDragStart,
  handleDrop,
} from './drug-and-drop';
import ErrorMsg from '../error';

let instance;

function active(elem) {
  const { action } = elem.dataset;
  if (actions[action]) {
    actions[action](elem);
  }
}

function handleClick(e) {
  active(e.target);
}

class Content {
  get container() {
    return this.appContainer;
  }

  constructor() {
    if (instance) {
      return instance;
    }
    this.appContainer = null;
    this.wordsData = null;
    this.dontKnowWords = [];
    this.curWords = 0;
    instance = this;
    return this;
  }

  static create() {
    return new Content();
  }

  addDontKnowWords(num) {
    this.dontKnowWords.push(num);
  }

  getCurWords() {
    return this.curWords;
  }

  getWordsData() {
    return this.wordsData;
  }

  setData(data) {
    this.wordsData = data;
    return this;
  }

  createContainer() {
    this.appContainer = createDomElem('div', ['content']);
    return this;
  }

  addTips() {
    const tips = Tips.create()
      .setData(this.wordsData[this.curWords])
      .createContainer()
      .addContent();
    this.container.append(tips.container);
    return this;
  }

  addField(imgData) {
    const field = Field.create()
      .createContainer()
      .addContent(imgData);
    this.container.append(field.container);
    return this;
  }

  addPuzzleWords() {
    const words = WordsPuzzle.create()
      .createContainer()
      .setWords(this.wordsData[this.curWords].textExample)
      .addContent();
    this.container.append(words.container);
    return this;
  }

  addControls() {
    const btns = Buttons.create()
      .createContainer()
      .addKnowBtn()
      .container;
    this.container.append(btns);
    return this;
  }

  addEventClick() {
    this.container.addEventListener('click', handleClick);
    return this;
  }

  addEventDrug() {
    this.container.addEventListener('dragstart', handleDragStart);
    this.container.addEventListener('dragover', handleDragOver);
    this.container.addEventListener('drop', handleDrop);
    this.container.addEventListener('dragend', handleDragEnd);
    return this;
  }

  nextWords() {
    if (this.curWords < this.wordsData.length - 1) {
      actions.isCheck = false;
      this.curWords += 1;
      WordsPuzzle.create()
        .setWords(this.wordsData[this.curWords].textExample)
        .addContent();
    }
    return this;
  }

  updateContent(data, url) {
    this.setData(data);
    this.curWords = 0;
    Tips.create()
      .cleanContainer()
      .setData(this.wordsData[this.curWords])
      .addContent();
    Field.create()
      .cleanContainer()
      .cleanFields()
      .addContent(url);
    WordsPuzzle.create()
      .cleanContainer()
      .setWords(this.wordsData[this.curWords].textExample)
      .addContent();
    Buttons.create()
      .cleanContainer()
      .addKnowBtn();
    ErrorMsg.create().cleanContainer();
    actions.isCheck = false;
    this.dontKnowWords = [];
    return this;
  }
}

export default Content;
