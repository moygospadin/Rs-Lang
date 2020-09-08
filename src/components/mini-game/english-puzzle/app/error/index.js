import createDomElem from '../../common';

let instance;

class ErrorMsg {
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
    return new ErrorMsg();
  }

  createContainer() {
    this.appContainer = createDomElem('div', ['error-msg']);
    return this;
  }

  addError(str) {
    if (this.container) {
      this.container.insertAdjacentHTML('beforeend', `
      <div class="alert alert-danger" role="alert">
        Something goes wrong: ${str}
      </div>`);
    }
    return this;
  }

  cleanContainer() {
    if (this.container) {
      this.container.textContent = '';
    }
    return this;
  }
}

export default ErrorMsg;
