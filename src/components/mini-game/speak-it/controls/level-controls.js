import { createGroups, createPages } from './common';
import createDomElem from '../common';

let instance;

class LevelControls {
  get container() {
    return this.appContainer;
  }

  static create() {
    return new LevelControls();
  }

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.appContainer = null;
    this.page = null;
    this.group = null;
    return this;
  }

  createContainer() {
    this.appContainer = createDomElem('div', ['speak-it__controls-level']);
    return this;
  }

  addLevel(group, page) {
    const groups = createGroups(group);
    const pages = createPages(page);
    this.container.append(groups, pages);
    return this;
  }
}

export default LevelControls;
