import info from './info';
import renderHeader from '../../../shared/header/renderHeader';
import renderHubPage from './renderHubPage';
import renderMenu from '../../../shared/menu/renderMenu';
import '../../../styles/header.scss';
import '../../../styles/hub-page.scss';
import '../../../styles/menu.scss';
import createElement from '../../../shared/createElement';
import burgerIconHandler from '../../../shared/menu/burgerIconHandler';
import setItemActiveState from '../../../shared/menu/setItemActiveState';
import { getAmountOfDoneCards } from '../../learningWords/updateAmountOfDoneCards';
import logoutButtonHandler from '../../../shared/header/logoutButtonHandler';

function updateHubPageInfo() {
  info.cardsPerDay = localStorage.getItem('cardsLimit') ? localStorage.getItem('cardsLimit') : 80;
  info.cardsCompleted = getAmountOfDoneCards();
}

export default function initHubPage() {
  const root = document.querySelector('.root');
  const hub = createElement('div', 'hub');
  updateHubPageInfo();
  hub.append(renderHeader(), renderHubPage(info), renderMenu());
  root.append(hub);
  burgerIconHandler();
  setItemActiveState();
  logoutButtonHandler();
}
