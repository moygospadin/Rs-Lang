// eslint-disable-next-line import/no-cycle
import Content from './index';
// eslint-disable-next-line import/no-cycle
import Field from './field';
import WordsPuzzle from './words-puzzle';
import Buttons from './buttons';
import Tips from './tips';
import createDomElem from '../../common';
// eslint-disable-next-line import/no-cycle
import { nextLevel } from '../controls';
import Result from '../result';

export function checkField() {
  const curPos = Content.create().getCurWords();
  const btns = Buttons.create();
  const words = WordsPuzzle.create().getWords().split(' ');
  const field = Field.create().getFields()[curPos];
  const wordsInField = [...field.children].filter((elem) => elem.textContent !== '');
  if (wordsInField.length === words.length) {
    btns.addCheckBtn();
    btns.delKnowBtn();
  } else {
    btns.delCheckBtn();
    btns.addKnowBtn();
  }
}

export function cleanCheckWords() {
  const wordsCorrect = document.querySelectorAll('.correct-word');
  const wordsWrong = document.querySelectorAll('.wrong-word');
  wordsCorrect.forEach((word) => word.classList.remove('correct-word'));
  wordsWrong.forEach((word) => word.classList.remove('wrong-word'));
}

export function replaceWord(field, elem, direction) {
  const newElem = field.find((element) => {
    if (element.textContent === '') {
      const firstPart = createDomElem('div', ['shape-part']);
      const lastPart = createDomElem('div', ['shape-part']);
      // eslint-disable-next-line no-param-reassign
      element.textContent = elem.textContent;
      element.setAttribute('data-action', `${direction}-field`);
      element.setAttribute('draggable', 'true');
      element.classList.add('puzzle-shape');
      element.append(firstPart, lastPart);
      return true;
    }
    return false;
  });
  const parentElem = elem.parentNode;
  elem.classList.remove('puzzle-shape');
  elem.removeAttribute('draggable');
  elem.removeAttribute('data-action');
  // eslint-disable-next-line no-param-reassign
  elem.textContent = '';
  elem.remove();
  parentElem.append(elem);
  return newElem;
}

function toggleBtns() {
  const btns = document.querySelectorAll('.puzzle__controls-options__btn');
  btns.forEach((btn) => {
    btn.classList.toggle('btn-primary');
    btn.classList.toggle('btn-secondary');
  });
}

const actions = {

  isSound: true,

  isCheck: false,

  repeat() {
    const audio = document.querySelector('.content__tips-audio');
    audio.play();
  },

  know() {
    if (!this.isCheck) {
      const content = Content.create();
      const curPos = content.getCurWords();
      content.addDontKnowWords(curPos);
      const words = WordsPuzzle.create().cleanContainer().getWords().split(' ');
      const field = Field.create()
        .cleanField(curPos)
        .getFields()[curPos];
      words.forEach((str) => {
        const firstPart = createDomElem('div', ['shape-part']);
        const lastPart = createDomElem('div', ['shape-part']);
        const word = createDomElem('div', ['content__words-item', 'puzzle-shape'], [str, firstPart, lastPart]);
        field.append(word);
      });
      this.check();
    }
  },

  check() {
    const curPos = Content.create().getCurWords();
    const words = WordsPuzzle.create().getWords().split(' ');
    const curField = Field.create().getFields()[curPos];
    const btns = Buttons.create();
    words.forEach((str, index) => {
      curField.children[index].classList.remove('correct-word', 'wrong-word');
      if (str === curField.children[index].textContent) {
        curField.children[index].classList.add('correct-word');
      } else {
        curField.children[index].classList.add('wrong-word');
      }
    });
    const result = words
      .every((str, index) => str === curField.children[index].textContent);
    if (result) {
      [...curField.children].forEach((el) => {
        el.removeAttribute('data-action');
        el.removeAttribute('draggable');
      });
      btns.delCheckBtn()
        .delKnowBtn()
        .addContinueBtn();
      this.isCheck = true;
      if (this.isSound) this.repeat();
      if (curPos === 9) {
        const { alt_description: description } = Field.create()
          .showImg().getImgData();
        Tips.create().cleanContainer();
        btns.cleanContainer()
          .addNextBtn()
          .addResultBtn();
        WordsPuzzle.create().addMessage(description);
      } else toggleBtns();
    } else {
      btns.addKnowBtn();
    }
  },

  continue() {
    WordsPuzzle.create().cleanContainer();
    toggleBtns();
    cleanCheckWords();
    Content.create().nextWords();
    const curPos = Content.create().getCurWords();
    const { textExampleTranslate, audioExample } = Content.create().getWordsData()[curPos];
    Tips.create()
      .delText()
      .delAudio()
      .setData({ textExampleTranslate, audioExample })
      .addText()
      .addAudio();
    Buttons.create()
      .delContinueBtn()
      .addKnowBtn();
  },

  'in-field': function (elem) {
    if (!this.isCheck) {
      const curPos = Content.create().getCurWords();
      const fieldClass = Field.create();
      const curField = fieldClass.getFields()[curPos];
      const field = [...curField.children];
      replaceWord(field, elem, 'out');
      checkField();
    }
  },

  'out-field': function (elem) {
    if (!this.isCheck) {
      cleanCheckWords();
      const field = [...WordsPuzzle.create()
        .container
        .children];
      replaceWord(field, elem, 'in');
      checkField();
    }
  },

  result() {
    const result = Result.create()
      .createContainer()
      .addContent()
      .container;
    Content.create()
      .container.append(result);
  },

  next() {
    if (Result.create().container) {
      Result.create().container.remove();
      Result.create().appContainer = null;
    }
    nextLevel();
  },

  sound(elem) {
    elem.parentNode.lastChild.play();
  },
};

export default actions;
