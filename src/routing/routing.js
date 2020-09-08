import checkTokenIsAlive from '../components/auth/checkTokenIsAlive';

class Routing {
  constructor(routes) {
    this.routes = routes;
  }

  loadPage(pathname) {
    this.root.innerHTML = '';
    this.root.append(this.routes[pathname]);
  }

  async navigation() {
    if (!window.location.href.match(/#\/.*$/)) {
      return;
    }
    const routePath = window.location.href.match(/#\/.*$/)[0];
    this.root.innerHTML = '';
    const route = this.routes[routePath];
    if (route.requiresAuth) {
      if (!await checkTokenIsAlive()) {
        this.routes['#/auth'].render();
        return;
      }
    }
    route.render();
  }

  init() {
    this.root = document.querySelector('.root');
    window.onpopstate = this.navigation.bind(this);
    if (!window.location.href.match(/#\/.*$/)) {
      window.history.replaceState({}, '#/', `${window.location.origin}#/`);
      this.navigation('#/');
    } else {
      this.navigation();
    }
  }
}

export default Routing;
