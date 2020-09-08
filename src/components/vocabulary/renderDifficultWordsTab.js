import getHardUserWords from './getHardUserWords';
import renderWordBlock from './renderWordBlock';

export default async function renderDifficultWords(userId, token) {
  const tab = document.querySelector('.vocabulary__tab');
  const wrapper = document.querySelector('.vocabulary__wrapper');
  wrapper.dataset.type = 'difficult-tab';
  const words = await getHardUserWords(userId, token);
  words.forEach((word) => {
    tab.append(renderWordBlock(word));
  });
}
