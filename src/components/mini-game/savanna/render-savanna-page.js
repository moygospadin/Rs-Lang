import './savanna.scss';
import control from './savanna-control';
import renderSavannaContent from './content-savanna-page';

export default function renderSavannaPage() {
  renderSavannaContent();
  control.startClick();
  control.click();
}
