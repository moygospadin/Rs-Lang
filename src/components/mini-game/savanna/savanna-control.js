import model from './savanna-model';
import view from './savanna-view';

const control = {
  startClick() {
    const btn = document.getElementsByClassName('btn-primary')[0];
    btn.addEventListener('click', () => view.generateGameLayout());
  },
  click() {
    document.querySelector('.savanna-game-wrapper').addEventListener('click', (event) => {
      switch (event.target.id) {
        case 'play-btn-2':
          model.playMusic(event.target.parentNode.parentNode.children[0]);
          break;
        case 'play-btn-1':
          model.playMusic(event.target.parentNode.children[0]);
          break;
        case 'word-btn':
          model.trueCheck(event.target.innerText);
          break;
        case 'play-btn':
          model.playMusic(event.target.children[0]);
          break;

        case 'next-level-btn':
          if (event.target.classList[2] !== 'disabled') {
            let level = localStorage.getItem('savanna-level');
            // eslint-disable-next-line
            level++;
            localStorage.setItem('savanna-level', level);
            model.mistakes = 0;
            model.timer = 0;
            model.arrayOfAnswers = [];
            model.index = 0;
            view.generateGameLayout();
          }
          break;
        case 'repeat-level-btn':
          model.mistakes = 0;
          model.timer = 0;
          model.arrayOfAnswers = [];
          model.index = 0;
          view.generateGameLayout();
          break;
        case 'next-difficulty-btn':
          if (event.target.classList[2] !== 'disabled') {
            let difficulty = localStorage.getItem('savanna-difficulty');
            // eslint-disable-next-line
            difficulty++;
            localStorage.setItem('savanna-difficulty', difficulty);
            model.mistakes = 0;
            model.timer = 0;
            model.arrayOfAnswers = [];
            model.index = 0;
            view.generateGameLayout();
          }
          break;
        case 'dropdown-difficulty':
          localStorage.setItem('savanna-difficulty', event.target.innerText);
          view.changeLevelDifficulty();
          break;
        case 'dropdown-level':
          localStorage.setItem('savanna-level', event.target.innerText);
          view.changeLevelDifficulty();
          break;
        case 'game-menu-btn':
          // eslint-disable-next-line
          location.reload();
          break;
        default:
          break;
      }
    });
  },
};
export default control;
