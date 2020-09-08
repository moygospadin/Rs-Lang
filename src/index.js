import './styles/normalize.css';
import './styles/style.scss';
import './styles/fonts.css';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/tooltip';
import './components/about-team-page/about-team-page';
import Routing from './routing/routing';
import routes from './routing/routes';

const routing = new Routing(routes);

document.addEventListener('DOMContentLoaded', () => {
  routing.init();
});
