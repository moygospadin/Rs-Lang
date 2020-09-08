let instance;

class State {
  static create() {
    return new State();
  }

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.page = 0;
    this.group = 0;
    this.words = null;
    this.score = 0;
    this.correct = [];
    return this;
  }

  set wordsData(data) {
    this.words = data;
  }

  get wordsData() {
    return this.words;
  }

  get correctWords() {
    return this.correct;
  }

  resetScore() {
    this.score = 0;
    this.correct = [];
    return this;
  }

  addPoint() {
    this.score += 1;
    return this;
  }
}

export default State;
