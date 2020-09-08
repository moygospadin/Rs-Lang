import createDomElem from '../common';
import Controls from './controls';
import Content from './content';
import ErrorMsg from './error';
// eslint-disable-next-line no-unused-vars

let instance;

class Puzzle {
  get container() {
    return this.appContainer;
  }

  constructor() {
    if (instance) {
      return instance;
    }
    this.appContainer = null;
    instance = this;
    return this;
  }

  static create() {
    return new Puzzle();
  }

  createContainer() {
    this.appContainer = createDomElem('div', ['puzzle']);
    return this;
  }

  addControls(data) {
    const controls = Controls.create()
      .createContainer()
      .addDataControls(data)
      .addOptionsControls()
      .addDataEventClick()
      .addOptionsEventClick();
    this.container.append(controls.container);
    return this;
  }

  addContent(data, imgData) {
    const content = Content.create()
      .setData(data)
      .createContainer()
      .addTips()
      .addField(imgData)
      .addPuzzleWords()
      .addControls()
      .addEventClick()
      .addEventDrug();
    this.container.append(content.container);
    return this;
  }

  addErrors() {
    const errors = ErrorMsg.create()
      .createContainer()
      .container;
    this.container.append(errors);
    return this;
  }
}

export default Puzzle;
