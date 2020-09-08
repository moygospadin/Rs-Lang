import LevelControls from './level-controls';
import createDomElem from '../common';
// eslint-disable-next-line import/named
import { createAppControls } from './common';

let instance;

class Controls {
  get container() {
    return this.appContainer;
  }

  static create() {
    return new Controls();
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
    this.appContainer = createDomElem('div', ['speak-it__controls']);
    return this;
  }

  addLevelControls(group, page) {
    const level = LevelControls.create()
      .createContainer()
      .addLevel(group, page)
      .container;
    this.container.append(level);
    return this;
  }

  addAppControls() {
    const btns = createAppControls();
    const app = createDomElem('div', ['speak-it__controls-app'], [...btns]);
    this.container.append(app);
    return this;
  }
}

export default Controls;
