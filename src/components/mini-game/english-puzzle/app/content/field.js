import createDomElem from '../../common';
// eslint-disable-next-line import/no-cycle
import Content from './index';

let instance;

class Field {
  get container() {
    return this.appContainer;
  }

  constructor() {
    if (instance) {
      return instance;
    }
    this.appContainer = null;
    this.fields = [];
    this.imgData = null;
    this.wordsContainer = null;
    this.isImg = true;
    instance = this;
    return this;
  }

  static create() {
    return new Field();
  }

  getImgData() {
    return this.imgData;
  }

  getFields() {
    return this.fields;
  }

  cleanFields() {
    this.fields = [];
    return this;
  }

  createContainer() {
    this.appContainer = createDomElem('div', ['content__field']);
    return this;
  }

  cleanContainer() {
    this.appContainer.innerHTML = '';
    return this;
  }

  cleanField(num) {
    this.fields[num].innerHTML = '';
    return this;
  }

  addImg() {
    const url = this.imgData.urls.regular;
    this.wordsContainer.setAttribute('style', `background-image: url(${url})`);
    return this;
  }

  delImg() {
    this.wordsContainer.setAttribute('style', 'background-color: gray');
    return this;
  }

  addContent(data) {
    this.imgData = data;
    const url = data.urls.regular;
    const words = Content.create().getWordsData();
    if (words) {
      const wordsNodeList = words.map((elem) => {
        const wordsArr = elem.textExample.split(' ').map(() => createDomElem('div', ['content__field-word']));
        const wordsList = createDomElem('div', ['content__field-words'], wordsArr);
        this.fields.push(wordsList);
        return wordsList;
      });
      const numNodeList = words.map((elem, i) => createDomElem('li', ['content__field-num'], [`${i + 1}`]));
      const numList = createDomElem('ul', ['content__field-nums'], [...numNodeList]);
      this.wordsContainer = createDomElem('div', ['content__field-words__container'], [...wordsNodeList]);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.wordsContainer.setAttribute('style', `background-image: url(${url})`);
      };
      this.container.append(numList, this.wordsContainer);
    }
    return this;
  }

  showImg() {
    const { height, width } = this.container.getBoundingClientRect();
    const url = this.imgData.urls.regular;
    this.cleanContainer();
    this.container.setAttribute('style', `width: ${width}px; height: ${height}px; background-image: url(${url})`);
    return this;
  }
}

export default Field;
