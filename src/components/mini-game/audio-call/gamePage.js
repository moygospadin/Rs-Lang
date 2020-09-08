import createElement from '../../../shared/createElement';
import createGameData from './createGameData';
import '../../../assets/icons/speaker.svg';
import '../../../assets/icons/spinner.svg';
import randomize from '../../../shared/randomize';
import getUserStastics from '../../../services/getUserStastics';
import setUserStatistics from '../../../services/setUserStatistics';
import getDate from '../../../shared/getDate';
import renderStatisticPage from './renderStatiticPage';
import createHeader from './createHeader';

class GamePage {
  constructor(createHTML, randomizing, getStatistics, setStatistics) {
    this.createElement = createHTML;
    this.randomize = randomizing;
    this.getStatistics = getStatistics;
    this.setStatistics = setStatistics;
    this.renderStatisticPage = renderStatisticPage;
    this.gameResults = {
      rightAnswers: [],
      wrongAnswers: [],
    };
    this.state = {};
  }

  variantsBlockHandler(e) {
    if (!e.target.classList.contains('audio-call__answer')) {
      return;
    }
    this.checkAnswer(e.target);
  }

  checkAnswer(target) {
    if (this.gameButton.dataset.value === 'Next') {
      return;
    }
    this.gameButton.textContent = 'Next';
    this.gameButton.dataset.value = 'Next';
    if (target.innerText === this.rightVariantText) {
      this.gameResults.rightAnswers.push(this.gameData);
      this.score += this.isHintUsed ? 1 : 2;
      this.scoreBlock.textContent = `Your score: ${this.score}`;
      target.classList.add('right');
      this.showAnswer();
    } else {
      this.gameResults.wrongAnswers.push(this.gameData);
      this.variants.forEach((el) => {
        if (el.innerText === this.rightVariantText) {
          el.classList.add('right');
        }
      });
      if (target instanceof Element) {
        target.classList.add('wrong');
      }
      this.showAnswer();
    }
  }

  showAnswer(value) {
    this.icon.src = this.wordImage;
    this.icon.onload = () => {
      this.icon.removeEventListener('click', this.soundHandler);
      this.answerBlock.classList.remove('hidden');
      if (!value) {
        this.variants.forEach((el) => {
          if (el.innerText === this.rightVariantText) {
            el.classList.add('right');
          }
        });
      }
    };
    this.gameButton.textContent = 'Next';
    this.gameButton.dataset.value = 'Next';
  }

  pageElementsDropToDefault() {
    this.variants.forEach((el) => {
      el.classList.remove('right');
      el.classList.remove('wrong');
    });
    this.gameButton.textContent = "I don't know";
    this.gameButton.dataset.value = "I don't know";
    this.icon.src = 'images/speaker.svg';
    this.icon.addEventListener('click', this.soundHandler);
    this.answerBlock.classList.add('hidden');
  }

  startRound() {
    this.pageElementsDropToDefault();
    this.isHintUsed = false;
    function check() {
      const gameData = this.gameWords.pop();
      if (!gameData && this.gameWords.length) {
        return check.call(this);
      }
      return gameData;
    }
    this.gameData = check.call(this);
    if (!this.gameData) {
      this.stopGame();
      return;
    }
    let variantsText = this.gameData.variants.map((el) => (el ? el.wordTranslate : ''));
    this.rightVariantText = this.gameData.wordTranslate;
    variantsText.push(this.gameData.wordTranslate);
    variantsText = this.randomize(variantsText);
    this.icon.onload = () => {
      variantsText.forEach((el, i) => {
        this.variants[i].textContent = el;
      });
    };
    this.audioTask = new Audio();
    this.audioTask.src = this.gameData.audio;
    this.audioHint = new Audio();
    this.audioHint.src = this.gameData.audioMeaning;
    this.wordImage = this.gameData.image;
    this.rightAnswer.textContent = this.gameData.word;
    setTimeout(this.audioTask.play.bind(this.audioTask), 200);
  }

  async getCurrentRound(e) {
    this.currentRound = [];
    if (e) {
      const level = Number(this.levelInput.value) > 0 ? Number(this.levelInput.value) - 1 : 0;
      this.currentRound.push(level, Number(this.roundInput.value));
      return this.currentRound;
    }
    const obj = await this.getStatistics(this.state)
      .then((res) => {
        if (res.optional && res.optional.audioCall.round) {
          const [level, round] = res.optional.audioCall.round;
          this.currentRound.push(level, round);
        } else {
          this.currentRound = [0, 1];
        }
        return this.currentRound;
      })
      .catch(() => {
        this.currentRound = [0, 1];
        return this.currentRound;
      });
    return obj;
  }

  async stopGame() {
    let round = Number(document.querySelector('#audioCallRound').value) + 1;
    let level = Number(document.querySelector('#audioCallLevel').value) - 1;
    if (round > 59) {
      round = 1;
      level = level === 5 ? 0 : (level + 1);
    }
    this.renderStatisticPage(this.gameResults);
    const date = getDate();
    const result = `${date}, m:${this.gameResults.wrongAnswers.map((el) => el.word)}`;
    let obj;
    try {
      obj = await this.getStatistics(this.state);
      const object = {};
      object.optional = obj.optional;
      object.learnedWords = obj.learnedWords;
      if (object.optional.audioCall && object.optional.audioCall.results) {
        object.optional.audioCall.results.push(result);
      } else {
        object.optional = {
          audioCall: {
            results: [result],
          },
        };
      }
      object.optional.audioCall.round = [level, round];
      obj = object;
    } catch (e) {
      obj = {
        learnedWords: 0,
        optional: {
          audioCall: {
            results: [result],
            round: [level, round],
          },
        },
      };
    }
    const { userId, token } = this.state;
    await this.setStatistics({ userId, token, obj });
  }

  createShowAnswerBlock() {
    this.answerBlock = this.createElement('div', ['audio-call__show-answer', 'hidden']);
    this.rightAnswer = this.createElement('div', 'audio-call__answer');
    const smallIcon = this.createElement('img', 'audio-call__small-icon');
    smallIcon.src = 'images/speaker.svg';
    smallIcon.addEventListener('click', this.soundHandler);
    this.answerBlock.append(smallIcon, this.rightAnswer);
    return this.answerBlock;
  }

  createVariantsBlock() {
    this.variantsBlock = this.createElement('div', 'audio-call__answers');
    this.variantsBlock.addEventListener('click', this.variantsBlockHandler.bind(this));
    this.variants = new Array(5);
    this.variants.fill(1);
    this.variants = this.variants.map(() => this.createElement('p', 'audio-call__answer'));
    this.variantsBlock.append(...this.variants);
    return this.variantsBlock;
  }

  createSoundIcon() {
    this.icon = this.createElement('img', 'audio-call__speaker');
    this.icon.src = 'images/speaker.svg';
    this.soundHandler = this.soundIconHandler.bind(this);
    this.icon.addEventListener('click', this.soundHandler);
    return this.icon;
  }

  soundIconHandler() {
    this.audioTask.play();
  }

  createGameButton() {
    this.gameButton = this.createElement('button', ['audio-call__game-button', 'btn', 'btn_yellow']);
    this.gameButton.textContent = "I don't know";
    this.gameButton.dataset.value = "I don't know";
    this.gameButton.addEventListener('click', this.gameButtonHandler.bind(this));
    return this.gameButton;
  }

  createLevelControls() {
    const form = this.createElement('form', 'audio-call-form');
    this.levelInput = this.createElement('select', ['audio-call-form__select', 'form-control']);
    this.levelInput.id = 'audioCallLevel';
    this.roundInput = this.createElement('select', ['audio-call-form__select', 'form-control']);
    this.roundInput.id = 'audioCallRound';
    this.levelInput.addEventListener('change', this.init.bind(this));
    this.roundInput.addEventListener('change', this.init.bind(this));
    for (let i = 1; i <= 59; i += 1) {
      const option = this.createElement('option');
      option.value = i;
      option.textContent = i;
      this.roundInput.append(option);
    }
    for (let i = 1; i <= 6; i += 1) {
      const option = this.createElement('option');
      option.value = i;
      option.textContent = i;
      this.levelInput.append(option);
    }
    if (this.currentRound) {
      [this.levelInput.value, this.roundInput.value] = this.currentRound;
      this.levelInput.value = Number(this.levelInput.value) + 1;
    }
    const levelBlock = this.createElement('div', ['audio-call-form__block', 'form-group']);
    const roundBlock = this.createElement('div', ['audio-call-form__block', 'form-group']);
    const levelLabel = this.createElement('label');
    levelLabel.textContent = 'Level:';
    levelLabel.for = 'audioCallLevel';
    const roundLabel = this.createElement('label');
    roundLabel.textContent = 'Round:';
    roundLabel.for = 'audioCallRound';
    roundBlock.append(roundLabel, this.roundInput);
    levelBlock.append(levelLabel, this.levelInput);
    form.append(levelBlock, roundBlock);
    return form;
  }

  createScoreBlock() {
    this.score = 0;
    this.scoreBlock = this.createElement('div', 'audio-call__score');
    this.scoreBlock.textContent = `Your score: ${this.score}`;
    return this.scoreBlock;
  }

  gameButtonHandler() {
    const text = this.gameButton.dataset.value;
    switch (text) {
      case "I don't know":
        this.showAnswer(false);
        return;
      case 'Next':
        this.startRound();
        return;
      case 'Next round':
        this.init();
        return;
      default:
        this.startRound();
    }
  }

  createHintButton() {
    const button = this.createElement('button', ['audio-call__hint-button', 'btn', 'btn_yellow']);
    button.textContent = 'Get a hint';
    button.addEventListener('click', this.hintButtonHandler.bind(this));
    return button;
  }

  hintButtonHandler() {
    this.audioHint.play();
    this.isHintUsed = true;
  }

  renderPage() {
    const elements = [];
    const flexContainer = this.createElement('div', 'flex-container');
    flexContainer.append(this.createLevelControls(), this.createScoreBlock());
    elements.push(createHeader(), flexContainer);
    const gameBlock = this.createElement('div', ['card', 'audio-call__main-elements']);
    gameBlock.append(this.createSoundIcon(), this.createShowAnswerBlock());

    gameBlock.append(this.createVariantsBlock());
    const btns = this.createElement('div', 'audio-call__buttons');
    btns.append(this.createGameButton(), this.createHintButton());
    gameBlock.append(btns);
    elements.push(gameBlock);
    // elements.push(this.createSoundIcon(), this.createShowAnswerBlock());
    // elements.push(this.createVariantsBlock(), this.createGameButton());
    // elements.push(this.createHintButton());
    return elements;
  }

  loadingPlug() {
    const loader = this.createElement('img', 'loader');
    loader.src = '/images/spinner.svg';
    const message = this.createElement('p', 'audio-call_message');
    message.innerText = 'Loading, please wait';
    return [loader, message];
  }

  closeBtnHandler(){
    document.querySelector('#audio-call-close').addEventListener('click', () => {
      window.location.hash = '#/audiocall';
    });
  }

  async init(e) {
    this.gameResults.rightAnswers = [];
    this.gameResults.wrongAnswers = [];
    const settings = JSON.parse(localStorage.getItem('userInfo'));
    this.state.userId = settings.userId;
    this.state.token = settings.token;
    const root = document.querySelector('.root');
    const container = this.createElement('div', ['container', 'audio-call']);
    container.append(...this.loadingPlug());
    root.removeChild(root.firstChild);
    root.append(container);
    await this.getCurrentRound(e)
      .then(async (arr) => {
        const result = await createGameData(arr);
        return result;
      })
      .then((words) => {
        this.gameWords = words;
        container.innerHTML = '';
        container.append(...this.renderPage());
        this.startRound();
      });
  }
}

const gamePage = new GamePage(createElement, randomize, getUserStastics, setUserStatistics);

export default gamePage;
