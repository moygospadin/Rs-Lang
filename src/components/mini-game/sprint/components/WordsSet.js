/* eslint-disable class-methods-use-this */
export default class WordsSet {
  constructor(collection) {
    this.collection = collection;
  }

  getGamesPairWord() {
    const couple = {};
    if (this.randomInteger(1, 3) === 3) {
      const firstIndex = this.randomInteger(0, 19);
      const secondIndex = this.randomInteger(0, 19);
      couple.rus = this.collection[firstIndex].rus;
      couple.eng = this.collection[secondIndex].eng;
      couple.correct = firstIndex === secondIndex;
    } else {
      const index = this.randomInteger(0, 19);
      couple.rus = this.collection[index].rus;
      couple.eng = this.collection[index].eng;
      couple.correct = true;
    }
    return couple;
  }

  randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  isCorrect(word) {
    return word.correct;
  }
}
