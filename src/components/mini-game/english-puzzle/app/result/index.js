import createDomElem from '../../common';
import wordRow from './common';
// eslint-disable-next-line import/no-cycle
import Content from '../content';
// eslint-disable-next-line import/no-cycle
import Field from '../content/field';

let instance;

class Result {
  get container() {
    return this.appContainer;
  }

  static create() {
    return new Result();
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
    this.appContainer = createDomElem('div', ['result']);
    return this;
  }

  addContent() {
    const data = Field.create().getImgData();
    const content = Content.create();
    const words = content.wordsData;
    const dontKnow = content.dontKnowWords;
    const correctWords = words
      .filter((obj, i) => dontKnow.indexOf(i) === -1)
      .map((obj) => wordRow(obj));
    const wrongWords = words
      .filter((obj, i) => dontKnow.indexOf(i) !== -1)
      .map((obj) => wordRow(obj));
    const btns = ['next']
      .map((str) => createDomElem(
        'button', ['result__btn', 'btn', 'btn-primary'], [str.toUpperCase()], [['data-action', str]],
      ));
    const title = data.alt_description[0].toUpperCase() + data.alt_description.substring(1);
    const url = data.urls.full;
    const img = createDomElem('img', ['result__img'], null, [
      ['src', url],
      ['style', 'width: 100px'],
    ]);
    const imgTitle = createDomElem('p', ['result__img-title'], [title]);
    const imgContainer = createDomElem('div', ['result__img-container'], [img, imgTitle]);
    const btnsRow = createDomElem('div', ['result__controls'], btns);
    const correctTitle = createDomElem('p', ['result__title'], [`I know: ${correctWords.length}`]);
    const correctField = createDomElem('div', ['result__correct'], [correctTitle, ...correctWords]);
    const wrongTitle = createDomElem('p', ['result__title'], [`I don't know: ${wrongWords.length}`]);
    const wrongField = createDomElem('div', ['result__wrong'], [wrongTitle, ...wrongWords]);
    const wrap = createDomElem('div', ['result__wrap'], [imgContainer, correctField, wrongField, btnsRow]);
    this.container.append(wrap);
    return this;
  }

  removeContent() {
    this.container.textContent = '';
    return this;
  }
}

export default Result;
