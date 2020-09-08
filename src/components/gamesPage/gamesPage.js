import './gamesPage.scss';
import renderContent from './renderContent';
import renderMenu from '../../shared/menu/renderMenu';
import burgerIconHandler from '../../shared/menu/burgerIconHandler';
import setItemActiveState from '../../shared/menu/setItemActiveState';
import renderHeader from '../../shared/header/renderHeader';
import logoutButtonHandler from '../../shared/header/logoutButtonHandler';
import '../../styles/header.scss';
import '../../styles/menu.scss';

export default function gamesPages() {
  renderContent();
  const gamesWrapper = document.querySelector('.games-page__wrapper');
  gamesWrapper.append(renderMenu(), renderHeader());
  burgerIconHandler();
  setItemActiveState();
  logoutButtonHandler();
}
