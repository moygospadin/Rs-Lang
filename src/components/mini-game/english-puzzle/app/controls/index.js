import createDomElem from '../../common';
import { createDataControls, createList, createOptionsControls } from './common';
// eslint-disable-next-line import/no-cycle
import Content from '../content';
// eslint-disable-next-line import/no-cycle
import actionsContent from '../content/action';
import Tips from '../content/tips';
// eslint-disable-next-line import/no-cycle
import Field from '../content/field';
import getImg, { getWords } from '../../data';
import ErrorMsg from '../error';

let instance;

function changeText(elem, val) {
  const secondElem = 1;
  const toggle = elem.parentNode.querySelector('.dropdown-toggle');
  const text = toggle.textContent.split(' ');
  text[secondElem] = `${val + 1}`;
  toggle.textContent = text.join(' ');
}

async function changeView(elem, value, type) {
  let { page, group } = instance.info;
  if (type === 'page') page = value;
  else group = value;
  const data = await getWords(page, group);
  let imgData = await getImg();
  if (typeof data === 'object') {
    if (imgData === 'string') {
      ErrorMsg.create().addError(imgData);
      imgData = {
        urls: {
          full: '',
          regular: '',
        },
        alt_description: '',
      };
    }
    changeText(elem.parentNode, parseInt(type === 'page' ? page : group, 10));
    instance.info = { group, page };
    Content.create().updateContent(data, imgData);
  } else {
    ErrorMsg.create().addError(data);
  }
}

function changePage(num) {
  const pages = document.querySelector('.puzzle__controls-pages');
  const toggle = pages.querySelector('.dropdown-toggle');
  const menu = pages.querySelector('.dropdown-menu');
  const name = 'page';
  const newMenu = createList(num, name);
  toggle.textContent = 'Page: 1';
  menu.textContent = '';
  menu.append(...newMenu.children);
}

function toggleTip(obj, name) {
  if (obj[`is${name}`]) {
    // eslint-disable-next-line no-param-reassign
    obj[`is${name}`] = !obj[`is${name}`];
    obj[`del${name}`]();
  } else {
    // eslint-disable-next-line no-param-reassign
    obj[`is${name}`] = !obj[`is${name}`];
    obj[`add${name}`]();
  }
}

const actions = {
  page(elem) {
    const [value] = Object.values(elem.dataset);
    const [type] = Object.keys(elem.dataset);
    changeView(elem, parseInt(value, 10), type);
  },
  level(elem) {
    const pages = [45, 40, 40, 25, 25, 25];
    const [value] = Object.values((elem.dataset));
    const [type] = Object.keys(elem.dataset);
    instance.info.page = 0;
    changeView(elem, parseInt(value, 10), type);
    changePage(pages[parseInt(value, 10)]);
  },
  sound() {
    actionsContent.isSound = !actionsContent.isSound;
  },
  translate() {
    const tips = Tips.create();
    toggleTip(tips, 'Text');
  },
  melody() {
    const tips = Tips.create();
    toggleTip(tips, 'Btn');
  },
  image() {
    const field = Field.create();
    toggleTip(field, 'Img');
  },
};

export function nextLevel() {
  const second = 1;
  const addToNextPage = 2;
  const pages = document.querySelector('.puzzle__controls-pages');
  const page = [...pages.querySelectorAll('.dropdown-item')]
    .find((elem) => parseInt(elem.textContent.split(' ')[second], 10) === instance.info.page + addToNextPage);
  if (page) {
    page.click();
  } else {
    const groups = document.querySelector('.puzzle__controls-levels');
    const group = [...groups.querySelectorAll('.dropdown-item')]
      .find((elem) => parseInt(elem.textContent.split(' ')[second], 10) === instance.info.group + addToNextPage);
    if (group) group.click();
  }
}

function changeData(e) {
  const [action] = Object.keys(e.target.dataset);
  if (actions[action]) {
    actions[action](e.target);
  }
}

function toggleActive(elem) {
  elem.classList.toggle('btn-primary');
  elem.classList.toggle('btn-secondary');
}

function changeOptions(e) {
  const [type] = Object.values(e.target.dataset);
  if (actions[type]) {
    toggleActive(e.target);
    actions[type](e.target);
  }
}

class Controls {
  get container() {
    return this.controlsContainer;
  }

  set info(data) {
    this.curInfoLevel = data;
  }

  get info() {
    return this.curInfoLevel;
  }

  constructor() {
    if (instance) {
      return instance;
    }
    this.controlsContainer = null;
    this.dataElem = null;
    this.optionsElem = null;
    this.curInfoLevel = null;
    instance = this;
    return this;
  }

  static create() {
    return new Controls();
  }

  createContainer() {
    this.controlsContainer = createDomElem('div', ['puzzle__controls']);
    return this;
  }

  addDataControls(data) {
    this.info = data;
    this.dataElem = createDataControls(data);
    this.container.append(this.dataElem);
    return this;
  }

  addDataEventClick() {
    this.dataElem.addEventListener('click', changeData);
    return this;
  }

  addOptionsControls() {
    this.optionsElem = createOptionsControls();
    this.container.append(this.optionsElem);
    return this;
  }

  addOptionsEventClick() {
    this.optionsElem.addEventListener('click', changeOptions);
    return this;
  }
}

export default Controls;
