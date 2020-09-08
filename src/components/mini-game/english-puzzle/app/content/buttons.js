import createDomElem from '../../common';

function createBtn(text, className) {
  return createDomElem('button', ['content__btn', 'btn', 'btn-primary', className], [text]);
}

let instance;

class Buttons {
  get container() {
    return this.appContainer;
  }

  constructor() {
    if (instance) {
      return instance;
    }
    this.appContainer = null;
    this.startBtn = null;
    this.checkBtn = null;
    this.continueBtn = null;
    this.resultBtn = null;
    this.nextBtn = null;
    instance = this;
    return this;
  }

  static create() {
    return new Buttons();
  }

  createContainer() {
    this.appContainer = createDomElem('div', ['content__btns']);
    return this;
  }

  cleanContainer() {
    this.startBtn = null;
    this.checkBtn = null;
    this.continueBtn = null;
    this.resultBtn = null;
    this.nextBtn = null;
    this.appContainer.innerHTML = '';
    return this;
  }

  addNextBtn() {
    if (!this.nextBtn) {
      this.nextBtn = createBtn('Next level');
      this.nextBtn.setAttribute('data-action', 'next');
      this.container.append(this.nextBtn);
    }
    return this;
  }

  delNextBtn() {
    if (this.nextBtn) {
      this.nextBtn.remove();
      this.nextBtn = null;
    }
    return this;
  }

  addResultBtn() {
    if (!this.resultBtn) {
      this.resultBtn = createBtn('Result');
      this.resultBtn.setAttribute('data-action', 'result');
      this.container.append(this.resultBtn);
    }
    return this;
  }

  delResultBtn() {
    if (this.resultBtn) {
      this.resultBtn.remove();
      this.resultBtn = null;
    }
    return this;
  }

  addKnowBtn() {
    if (!this.startBtn) {
      this.startBtn = createBtn('I don\'t know', 'know');
      this.startBtn.setAttribute('data-action', 'know');
      this.container.append(this.startBtn);
    }
    return this;
  }

  delKnowBtn() {
    if (this.startBtn) {
      this.startBtn.remove();
      this.startBtn = null;
    }
    return this;
  }

  addCheckBtn() {
    if (!this.checkBtn) {
      this.checkBtn = createBtn('Check', 'check');
      this.checkBtn.setAttribute('data-action', 'check');
      this.container.append(this.checkBtn);
    }
    return this;
  }

  delCheckBtn() {
    if (this.checkBtn) {
      this.checkBtn.remove();
      this.checkBtn = null;
    }
    return this;
  }

  addContinueBtn() {
    if (!this.continueBtn) {
      this.continueBtn = createBtn('Continue', 'continue');
      this.continueBtn.setAttribute('data-action', 'continue');
      this.container.append(this.continueBtn);
    }
    return this;
  }

  delContinueBtn() {
    if (this.continueBtn) {
      this.continueBtn.remove();
      this.continueBtn = null;
    }
    return this;
  }
}

export default Buttons;
