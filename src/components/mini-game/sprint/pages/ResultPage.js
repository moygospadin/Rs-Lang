/* eslint-disable import/no-cycle */
import renderStarSprintPage from './StartSprintPage';
import initSprintPage from './SprintPage';
import clearCurrentPage from '../methods/clearCurrentPage';

export default function renderResultPage(score) {
  const card = document.querySelector('.root');
  card.insertAdjacentHTML('beforeend', `
  <div class="container vh-100 d-flex flex-column justify-content-center align-items-center">
  <div class="card w-50 h-50 bg-result-sprint">
<div class="card-body text-center">
<div class="result-sprint h2">Congratulations!<br>  Your score: ${score.score}</div>
<div class="buttons mt-5 btn-group-vertical">
  <button type="button" class="btn btn-primary btn-lg btn-again">Try again</button>
  <button type="button" class="btn btn-primary btn-lg btn-menu mt-4">Choose another level</button>
  <button type="button" class="btn btn-primary btn-lg btn-block mt-4 btn-exit">Exit</button>
  </div>
</div>
</div>
</div>
  `);
  const trueButton = document.querySelector('.btn-again');
  trueButton.addEventListener('click', () => {
    clearCurrentPage();
    const data = JSON.parse(localStorage.getItem('current_sprint') || '[]');
    initSprintPage(data);
  });

  const falseButton = document.querySelector('.btn-menu');
  falseButton.addEventListener('click', () => {
    clearCurrentPage();
    renderStarSprintPage();
  });
  const endButton = document.querySelector('.btn-exit');
  endButton.addEventListener('click', () => {
    console.log('exit');
    window.location.hash = '#/hub';
  });
}
