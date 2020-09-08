import renderWordBlock from './renderWordBlock';
import getAllUserWords from '../../services/getAllUserWords';

export default async function renderLearningWordsTab(userId, token) {
  const tab = document.querySelector('.vocabulary__tab');
  const wrapper = document.querySelector('.vocabulary__wrapper');
  const words = await getAllUserWords({ userId, token });
  wrapper.dataset.type = 'learn-tab';
  words.forEach((word) => {
    tab.append(renderWordBlock(word));
  });
}
