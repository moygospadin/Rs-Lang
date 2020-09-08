import createDomElem from './common';
import Controls from './controls';
import Content from './content';
import actions from './actions';
import ErrorMsg from './error';

let instance;

function clickHandle(e) {
  const first = 0;
  const action = Object.entries(e.target.dataset);
  if (action.length > 0) {
    const [data, val] = action[first];
    if (val === 'speak' && actions.recognition) {
      actions[data](e.target, val);
      return;
    }
    if (actions[data] && !actions.recognition) {
      actions[data](e.target, val);
    }
  }
}

class SpeakIt {
  get container() {
    return this.appContainer;
  }

  static create() {
    return new SpeakIt();
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
    this.appContainer = createDomElem('div', ['speak-it']);
    return this;
  }

  addControls(group, page) {
    const controls = Controls.create()
      .createContainer()
      .addLevelControls(group, page)
      .addAppControls()
      .container;
    this.container.append(controls);
    return this;
  }

  addError() {
    const errorField = ErrorMsg.create()
      .createContainer()
      .container;
    this.container.append(errorField);
    return this;
  }

  addContent() {
    const content = Content.create()
      .createContainer()
      .addStartImage()
      .addWordsSet()
      .container;
    this.container.append(content);
    return this;
  }

  addClickHandle() {
    this.container.addEventListener('click', clickHandle);
    return this;
  }
}

export default SpeakIt;
