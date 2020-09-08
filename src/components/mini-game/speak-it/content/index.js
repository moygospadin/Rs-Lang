import createDomElem from '../common';
import ImageField from './content-image';
import WordsField from './content-words';

let instance;

class Content {
  get container() {
    return this.appContainer;
  }

  static create() {
    return new Content();
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
    this.appContainer = createDomElem('div', ['speak-it__content']);
    return this;
  }

  addStartImage() {
    const field = ImageField.create()
      .createContainer()
      .addContent()
      .container;
    this.container.append(field);
    return this;
  }

  addWordsSet() {
    const field = WordsField.create()
      .createContainer()
      .addContent()
      .container;
    this.container.append(field);
    return this;
  }
}

export default Content;
