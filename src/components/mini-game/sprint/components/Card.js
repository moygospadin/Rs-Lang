export default class Card {
  constructor(wordSet) {
    this.wordSet = wordSet;
  }

  renderCard() {
    const container = document.querySelector('.container');
    container.insertAdjacentHTML('beforeend',
      `
    <div class="card">
    <h5 class="card-header text-center bg-yellow">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <p class="info"></p>
    </h5>
  <div class="card-body card-sprint text-center">
    <div class="words">
      <h3 class="word_english mb-4"> </h3>
      <h3 class="word_russian"> </h5>
    </div>
  </div>
  </div>`);
    this.renderWords();
  }

  renderWords() {
    const englishContent = document.querySelector('.word_english');
    const russianContent = document.querySelector('.word_russian');
    this.currentWords = this.wordSet.getGamesPairWord();
    englishContent.firstChild.nodeValue = this.currentWords.eng;
    russianContent.firstChild.nodeValue = this.currentWords.rus;
  }

  isCorrect() {
    return this.currentWords.correct;
  }

  succesClick() {
    const dots = document.querySelectorAll('.dot');
    for (let i = 0; i < dots.length; i++) {
      if (!dots[i].classList.contains('dot-succes')) {
        dots[i].classList.add('dot-succes');
        return;
      }
    }
    this.unsuccesClick();
  }

  unsuccesClick() {
    const dots = document.querySelectorAll('.dot');
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('dot-succes');
    }
  }
}
