/* eslint-disable class-methods-use-this */
export default class CircleTimer {
  constructor() {
    this.TIME_LIMIT = 60;
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
  }

  formatTime(seconds) {
    return `${seconds}`;
  }

  renderCircleTimer() {
    const container = document.querySelector('.container');
    container.insertAdjacentHTML('beforeend', `<div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="20"></circle>
        <path
        id="base-timer-path-remaining"
        stroke-dasharray="125"
        class="base-timer__path-remaining green"
        d="
          M 50, 50
          m -20, 0
          a 20,20 0 1,0 40,0
          a 20,20 0 1,0 -40,0
        "
      ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">
    ${this.formatTime(this.timeLeft)}
    </span>
  </div>`);
  }

  startTimer() {
    const timerInterval = setInterval(() => {
      this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      if (this.timePassed === 60) {
        clearInterval(timerInterval);
      }
      document.getElementById('base-timer-label').innerHTML = this.formatTime(this.timeLeft);
      this.setCircleDasharray();
    }, 1000);
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * 125
    ).toFixed(0)} 125`;
    document
      .getElementById('base-timer-path-remaining')
      .setAttribute('stroke-dasharray', circleDasharray);
  }
}
