import './learningWords.scss';
import renderContent from './renderContent';
import checkInput from './checkInput';
import setProps from './setProps';
import setInputWidth from './setInputWidth';
import createAudioObjects from './pronunciation/createAudioObjects';
import addEventListeners from './pronunciation/addEventListeners';
import fillCardDueToSettings from './fillCardDueToSettings';
import setTranslationSettings from './setTranslationSettings';
import switchTranslationSettings from './switchTranslationSettings';
import renderMenu from '../../shared/menu/renderMenu';
import burgerIconHandler from '../../shared/menu/burgerIconHandler';
import setItemActiveState from '../../shared/menu/setItemActiveState';
import renderHeader from '../../shared/header/renderHeader';
import logoutButtonHandler from '../../shared/header/logoutButtonHandler';
import '../../styles/header.scss';
import '../../styles/menu.scss';
import showAnswer from './showAnswer';
import goToTheNextWord from './goToTheNextWord';

export default async function learningWords() {
  await setProps();
  createAudioObjects();
  renderContent();
  addEventListeners();
  fillCardDueToSettings();
  setTranslationSettings();
  setInputWidth();
  checkInput();
  switchTranslationSettings();
  goToTheNextWord();
  const wrapper = document.querySelector('.learn-page__wrapper');
  wrapper.append(renderMenu(), renderHeader());
  burgerIconHandler();
  setItemActiveState();
  logoutButtonHandler();
  showAnswer();
}
