import createDomElem from '../common';
import getImg, { getWords } from '../data';
import Puzzle from '../app';
import ErrorMsg from '../app/error';
import getUserStatistic from '../../../../services/getUserStastics';
import setUserStatistics from '../../../../services/setUserStatistics';
import Controls from '../app/controls';

async function start() {
  let group = 0;
  let page = 6;
  const { userId, token } = JSON.parse(localStorage.getItem('userInfo'));
  const close = async (e) => {
    const dialogText = 'Are you sure?';
    e.returnValue = dialogText;
    window.removeEventListener('beforeunload', close);
    const { info } = Controls.create();
    try {
      const user = await getUserStatistic({ userId, token });
      if (user) {
        const obj = {
          optional: {
            ...user.optional,
            englishPuzzle: {
              ...info,
            },
          },
        };
        await setUserStatistics({
          userId,
          token,
          obj,
        });
      }
      // eslint-disable-next-line no-shadow
    } catch (e) {
      console.log(e.toString());
    }
    return dialogText;
  };
  window.addEventListener('beforeunload', close);
  try {
    const user = await getUserStatistic({ userId, token });
    if (user) {
      const { group: g, page: p } = user.optional.englishPuzzle;
      if (typeof g === 'number' && typeof p === 'number') {
        group = g;
        page = p;
      }
    }
  } catch (e) {
    await setUserStatistics({
      userId,
      token,
      obj: {
        optional: {
          englishPuzzle: {
            group: 0,
            page: 0,
          },
        },
      },
    });
  }
  const errors = ErrorMsg.create()
    .createContainer()
    .container;
  const root = document.querySelector('.root');
  const app = Puzzle.create()
    .createContainer()
    .addControls({ group, page })
    .addErrors();
  root.append(app.container, errors);
  const data = await getWords(page, group);
  let imgData = await getImg();
  if (typeof data === 'object') {
    if (imgData === 'string') {
      ErrorMsg.create().addError(imgData);
      imgData = {
        urls: {
          full: '',
          regular: '',
        },
        alt_description: '',
      };
    }
    app
      .addContent(data, imgData);
  } else {
    ErrorMsg.create().addError(data);
  }
}

function createStartPage() {
  const titleText = 'english puzzle';
  const image = document.createElement('img');
  image.src = require('../../../../assets/images/puzzle-2.png');
  const subtitleText = 'Click on words, collect phrases. <br> Words can be drugs and drop. Select tooltips in the menu';
  const subtitle = createDomElem('p', ['start-page__subtitle', 'info']);
  subtitle.innerHTML = subtitleText;
  const btn = createDomElem('button', ['start-page__btn', 'btn', 'btn-primary', 'btn_yellow'], ['Start']);
  const puzzleContainer = createDomElem('div', ['game-rules', 'card'], [image, subtitle, btn]);
  const page = createDomElem('div', ['start-page'], [puzzleContainer]);
  page.addEventListener('click', (e) => {
    if (e.target === btn) {
      e.currentTarget.remove();
      start();
    }
  });
  return page;
}

export default createStartPage;
