/* eslint-disable import/no-cycle */
import '../styles/sprintPage.scss';
import Card from '../components/Card';
import Score from '../components/Score';
import Buttons from '../components/Buttons';
import CircleTimer from '../components/CircleTimer';
import renderResultPage from './ResultPage';
import WordsSet from '../components/WordsSet';
import clearCurrentPage from '../methods/clearCurrentPage';
import getStatistics from '../../../../services/getUserStastics';
import setStatistics from '../../../../services/setUserStatistics';
import getDate from '../../../../shared/getDate';

const state = {};

function initState() {
  const settings = JSON.parse(localStorage.getItem('userInfo'));
  state.userId = settings.userId;
  state.token = settings.token;
}

async function sendScore(score) {
  let obj;
  initState();
  const date = getDate();
  const result = `${date}, score:${score.score}`;
  try {
    obj = await getStatistics(state);
    const object = {};
    object.optional = obj.optional;
    object.learnedWords = obj.learnedWords;
    if (object.optional.sprint && object.optional.sprint.results) {
      object.optional.sprint.results.push(result);
    } else {
      object.optional = {
        sprint: {
          results: [result],
        },
      };
    }
    obj = object;
  } catch (e) {
    obj = {
      learnedWords: 0,
      optional: {
        sprint: {
          results: [result],
        },
      },
    };
  }
  const { userId, token } = state;
  await setStatistics({ userId, token, obj });
}

function playCorrectAudio() {
  const audio = new Audio('/src/components/mini-game/sprint/assets/correct.mp3');
  audio.playbackRate = 1.5;
  audio.play();
}

function playUnCorrectAudio() {
  const audio = new Audio('/src/components/mini-game/sprint/assets/uncorrect.mp3');
  audio.playbackRate = 1.75;
  audio.play();
}

export default function initSprintPage(date) {
  const wordSet = new WordsSet(date);
  const card = new Card(wordSet);
  const score = new Score();
  const buttons = new Buttons();
  const timer = new CircleTimer();
  const page = document.querySelector('.root');
  page.insertAdjacentHTML('beforeend',
    `<div class="container vh-100 d-flex flex-column align-items-center justify-content-center">
</div>`);
  card.renderCard();
  score.renderScore();
  buttons.renderButtons();
  timer.renderCircleTimer();
  timer.startTimer();

  const trueButton = document.querySelector('.btn-success');
  trueButton.addEventListener('click', () => {
    if (card.isCorrect()) {
      playCorrectAudio();
      score.addScore();
      card.succesClick();
      card.renderWords();
    } else {
      playUnCorrectAudio();
      score.cancelBonus();
      card.unsuccesClick();
      card.renderWords();
    }
  });

  const falseButton = document.querySelector('.btn-danger');
  falseButton.addEventListener('click', () => {
    if (!card.isCorrect()) {
      playCorrectAudio();
      score.addScore();
      card.succesClick();
      card.renderWords();
    } else {
      playUnCorrectAudio();
      score.cancelBonus();
      card.unsuccesClick();
      card.renderWords();
    }
  });
  setTimeout(() => {
    clearCurrentPage();
    sendScore(score).then(() => {
      clearCurrentPage();
      renderResultPage(score);
    });
  }, 60000);
}
