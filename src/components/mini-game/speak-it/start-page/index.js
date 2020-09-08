import createDomElem from '../common';
import getWords from '../../../../shared/get-words';
import State from '../state';
import SpeakIt from '../index';
import getUserStatistic from '../../../../services/getUserStastics';
import setUserStatistics from '../../../../services/setUserStatistics';
import ErrorMsg from '../error';
import LevelControls from '../controls/level-controls';
import createElement from '../../../../shared/createElement';

function createStartPage(node) {
  const subTittle = [
    'Click on the words to hear them sound.',
    document.createElement('br'),
    'Click on the button and speak the words into the microphone.',
  ];
  const btn = 'START';
  const image = createElement('img');
  image.src = require('../../../../assets/images/speakit-2.png');
  const startPageSubTitle = createDomElem('p', ['start-page__subtitle', 'info'], [...subTittle]);
  const startPageBtn = createDomElem('button', ['start-page__btn', 'btn', 'btn-primary', 'btn_yellow'], [btn]);
  const startPageContainer = createDomElem('div', ['game-rules', 'card'], [image, startPageSubTitle, startPageBtn]);
  const startPage = createDomElem(
    'div', ['start-page'], [startPageContainer]
  );
  async function toContent() {
    let page = 0;
    let group = 0;
    const { userId, token } = JSON.parse(localStorage.getItem('userInfo'));
    const close = async (e) => {
      const dialogText = 'Are you sure?';
      e.returnValue = dialogText;
      window.removeEventListener('beforeunload', close);
      // eslint-disable-next-line no-shadow
      const { page, group } = LevelControls.create();
      try {
        const user = await getUserStatistic({ userId, token });
        if (user) {
          const obj = {
            optional: {
              ...user.optional,
              speakIt: {
                page,
                group,
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
        const { group: g, page: p } = user.optional.speakIt;
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
            speakIt: {
              group: 0,
              page: 0,
            },
          },
        },
      });
    }
    const data = await getWords(page, group);
    // eslint-disable-next-line no-multi-assign
    if (typeof data === 'object') {
      State.create()
        .wordsData = data;
      // eslint-disable-next-line no-shadow
      const speakIt = SpeakIt.create()
        .createContainer()
        .addControls(group, page)
        .addError()
        .addContent()
        .addClickHandle()
        .container;
      startPageBtn.removeEventListener('click', toContent);
      startPage.remove();
      node.append(speakIt);
    } else {
      ErrorMsg.create().addError(data);
    }
  }
  startPageBtn.addEventListener('click', toContent);
  return startPage;
}

export default function speakIt() {
  const page = document.querySelector('.root');
  page.innerHTML = '';
  page.append(createStartPage(page));
}
