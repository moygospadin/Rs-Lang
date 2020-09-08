import renderVocabulary from './renderVocabulary';
import vocabularyButtonsHandlers from './vocabularyButtonsHandlers';
import renderLearningWordsTab from './renderLearningWordsTab';
import renderMenu from '../../shared/menu/renderMenu';
import renderHeader from '../../shared/header/renderHeader';
import audioButtonHandler from './audioButtonHandler';
import burgerIconHandler from '../../shared/menu/burgerIconHandler';
import setItemActiveState from '../../shared/menu/setItemActiveState';
import createElement from '../../shared/createElement';
import '../../styles/header.scss';
import '../../styles/vocabulary.scss';
import '../../styles/menu.scss';
import logoutButtonHandler from '../../shared/header/logoutButtonHandler';

export default function initVocabulary() {
  const root = document.querySelector('.root');
  const vocabularyPage = createElement('div', 'vocabulary-page');
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  vocabularyPage.append(renderMenu(), renderHeader(), renderVocabulary());
  root.append(vocabularyPage);
  renderLearningWordsTab(userInfo.userId, userInfo.token);
  vocabularyButtonsHandlers(userInfo);
  audioButtonHandler();
  burgerIconHandler();
  setItemActiveState();
  logoutButtonHandler();
}
