import './our-game.scss';
import control from './our-game-control';
import renderContentOurGamePage from './content-our-game-page';

export default async function renderOurGamePage() {
  renderContentOurGamePage();
  control.startClick();
  control.click();
  control.btnPress();
}
