import changeLimits from './changeLimits';
import renderContent from './renderContent';
import './settings.scss';
import saveButtonHandler from './saveButtonHandler';
import hideSuccessNotification from './hideSuccessNotification';
import setCheckedToChosenSettings from './setCheckedToChosenSettings';
import renderMenu from '../../shared/menu/renderMenu';
import burgerIconHandler from '../../shared/menu/burgerIconHandler';
import setItemActiveState from '../../shared/menu/setItemActiveState';
import renderHeader from '../../shared/header/renderHeader';
import logoutButtonHandler from '../../shared/header/logoutButtonHandler';
import '../../styles/header.scss';
import '../../styles/menu.scss';

export default function settings() {
  renderContent();
  changeLimits();
  saveButtonHandler();
  setCheckedToChosenSettings();
  hideSuccessNotification();
  const wrapper = document.querySelector('.settings__wrapper');
  wrapper.append(renderMenu(), renderHeader());
  burgerIconHandler();
  setItemActiveState();
  logoutButtonHandler();
}
