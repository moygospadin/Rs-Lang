/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import '../styles/sprintPage.scss';
import initSprintPage from './SprintPage';
import initWords from '../methods/initWords';
import clearCurrentPage from '../methods/clearCurrentPage';

export default function renderStartSprintPage() {
  const page = document.querySelector('.root');
  page.insertAdjacentHTML('beforeend',
    `<div class="container vh-100 d-flex flex-column align-items-center justify-content-center">
    <img class="logo-game">
      <h1 class="title-game">Sprint</h1>
      <p class="sprint-info">You are getting pair of random words in English with translation. Your goal to choose true matches as muach as you can and get the biggest score.</p>
    <div class="form-group row allign-items-center">
    <div class="col-md-6">
      <label for="ex1">Difficulity</label>
      <select class="selectpicker form-control select-level" data-style='btn btn-primary'>
        <option value="" selected hidden>Select level of difficulty...</option>
      </select>
    </div>
    <div class="col-md-6">
      <label for="ex1">№</label>
      <select class="selectpicker form-control select-round" data-size="5">
        <option value="" selected hidden>Select number of set...</option>
      </select>
  </div>
  </div>
  <button type="button" class="btn btn-primary btn-lg btn-block mt-4 btn-start">Start game</button>
  <button type="button" class="btn btn-primary btn-lg btn-block mt-4 btn-exit">Exit</button>
  </div>`);
  initNumberOfLevels(6);
  initNumberOfRounds(30);
  initStartButton();
  initEndButton();
}

function appendOption(selector, value) {
  const node = document.createElement('option');
  node.innerHTML = value;
  selector.appendChild(node);
}

function initNumberOfLevels(value) {
  const selector = document.querySelector('.select-level');
  let count = 0;
  while (count !== value) {
    count += 1;
    appendOption(selector, count);
  }
}

function initNumberOfRounds(value) {
  const selector = document.querySelector('.select-round');
  let count = 0;
  while (count !== value) {
    count += 1;
    appendOption(selector, count);
  }
}

function initStartButton() {
  const startButton = document.querySelector('.btn-start');
  startButton.addEventListener('click', () => {
    const round = document.querySelector('.select-round option:checked').value - 1;
    const level = document.querySelector('.select-level option:checked').value - 1;
    localStorage.setItem('round_sprint', round);
    localStorage.setItem('level_sprint', level);
    initWords().then((result) => {
      if (round < 0 || level < 0) {
        alert('Choose difficulity and round please');
      } else {
        clearCurrentPage();
        localStorage.setItem('current_sprint', JSON.stringify(result));
        initSprintPage(result);
      }
    });
  });
}


function initEndButton() {
  const endButton = document.querySelector('.btn-exit');
  endButton.addEventListener('click', () => {
    console.log('exit');
    window.location.hash = '#/hub';
  });
}
