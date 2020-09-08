import renderAboutTeamPage from './about-team-page';
import swiper from './swiper';
import 'swiper/css/swiper.min.css';
import './about-team-page.scss';
import renderMenu from '../../shared/menu/renderMenu';
import burgerIconHandler from '../../shared/menu/burgerIconHandler';
import setItemActiveState from '../../shared/menu/setItemActiveState';
import renderHeader from '../../shared/header/renderHeader';
import logoutButtonHandler from '../../shared/header/logoutButtonHandler';
import '../../styles/header.scss';
import '../../styles/menu.scss';

export default function renderTeamPage() {
  renderAboutTeamPage();
  swiper();
  const wrapper = document.querySelector('.about-team-page');
  wrapper.append(renderMenu(), renderHeader());
  burgerIconHandler();
  setItemActiveState();
  logoutButtonHandler();
}
