import createDomElem from '../common';
import State from '../state';

let instance;

class ImageField {
  get container() {
    return this.appContainer;
  }

  static create() {
    return new ImageField();
  }

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.appContainer = null;
    this.img = null;
    this.title = null;
    this.output = null;
    this.score = null;
    this.imgUrl = 'https://st2.depositphotos.com/3591429/5246/i/450/depositphotos_52462701-stock-photo-people-and-english-concept.jpg';
    return this;
  }

  get fieldImg() {
    return this.img;
  }

  get fieldTitle() {
    return this.title;
  }

  get fieldOutput() {
    return this.output;
  }

  createContainer() {
    this.appContainer = createDomElem('div', ['speak-it__content-info']);
    return this;
  }

  addContent() {
    this.img = createDomElem('img', ['speak-it__content-info__img'], null, [['src', this.imgUrl]]);
    this.title = createDomElem('p', ['speak-it__content-info__img-title']);
    this.output = createDomElem('p', ['speak-it__content-info__img-input']);
    this.score = createDomElem('p', ['speak-it__content-info__img-score'], ['Score: 0']);
    this.container.append(this.score, this.img, this.title, this.output);
    return this;
  }

  resetInfo() {
    this.img.setAttribute('src', this.imgUrl);
    this.title.textContent = '';
    this.output.textContent = '';
    this.score.textContent = 'Score: 0';
    return this;
  }

  addPoint() {
    const points = State.create().score;
    if (this.score) {
      this.score.textContent = `Score: ${points}`;
    }
    return this;
  }
}

export default ImageField;
