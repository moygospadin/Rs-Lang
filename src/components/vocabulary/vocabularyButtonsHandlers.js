import renderLearningWordsTab from './renderLearningWordsTab';
import renderDifficultWordsTab from './renderDifficultWordsTab';

export default function vocabularyButtonsHandlers(userInfo) {
  const vocabTab = document.querySelector('.vocabulary__tab');
  const vocabButtons = document.querySelector('.vocabulary__buttons');

  vocabButtons.addEventListener('click', (event) => {
    const targetBtn = event.target.closest('.vocabulary__btn');
    switch (targetBtn.dataset.type) {
      case 'learningWords':
        if (vocabTab.dataset.type !== 'learn-tab') {
          vocabTab.textContent = '';
          renderLearningWordsTab(userInfo.userId, userInfo.token);
        }
        break;
      case 'difficultWords':
        if (vocabTab.dataset.type !== 'difficult-tab') {
          vocabTab.textContent = '';
          renderDifficultWordsTab(userInfo.userId, userInfo.token);
        }
        break;
      // case 'deletedWords':
      //   vocabTab.textContent = '';
      //   vocabTab.dataset.type = 'delete-tab';
      //   //renderDeletedWordsTab();
      //   break;
      default:
        return null;
    }
  });
}
