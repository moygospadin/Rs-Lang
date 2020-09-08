import model from './our-game-model';
import view from './our-game-view';

const control = {
  startClick() {
    const btn = document.querySelector('#srart-btn');
    btn.addEventListener('click', () => view.generateGameLayout());
  },
  click() {
    document
      .querySelector('.our-game-wrapper')
      .addEventListener('click', (event) => {
        switch (event.target.id) {
          case 'btn-green':
            document
              .querySelector('.learn-word')
              .classList.add('learn-word-slide-green');
            model.trueCheck(1);
            break;
          case 'btn-red':
            model.trueCheck(0);
            document
              .querySelector('.learn-word')
              .classList.add('learn-word-slide-red');
            break;
          case 'dropdown-difficulty':
            localStorage.setItem('our-game-difficulty', event.target.innerText);
            view.changeLevelDifficulty();
            break;
          case 'dropdown-level':
            localStorage.setItem('our-game-level', event.target.innerText);
            view.changeLevelDifficulty();
            break;
          case 'game-menu-btn':
            // eslint-disable-next-line
            location.reload();
            break;
          case 'repeat-level-btn':
            model.mistakes = 0;
            model.arrayOfAnswers = [];
            model.index = 0;
            model.rightAnswers = 0;
            model.gameDuration = 60;
            model.forTimer2 = 125;
            view.generateGameLayout();
            break;
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
          default:
            break;
        }
      });
  },
  btnPress() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowRight':
          model.trueCheck(0);
          document
            .querySelector('.learn-word')
            .classList.add('learn-word-slide-red');
          break;
        case 'ArrowLeft':
          document
            .querySelector('.learn-word')
            .classList.add('learn-word-slide-green');
          model.trueCheck(1);
          break;
        default:
          break;
      }
    });
  },
};
export default control;
