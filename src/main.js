// Importa las vistas
import home from './Vistas/home';
import login from './Vistas/login';
import error from './Vistas/error';
import mapa from './Vistas/mapa';
import registro from './Vistas/registro';
import mexico from './Vistas/mexico';
import colombia from './Vistas/colombia';
import peru from './Vistas/peru';
// import platostipicoscol from './Vistas/platostipicosCol';

const root = document.getElementById('root');

const routes = [
  { path: '/', vista: home },
  { path: '/Login', vista: login },
  { path: '/error', vista: error },
  { path: '/mapa', vista: mapa },
  { path: '/registro', vista: registro },
  { path: '/mexico', vista: mexico },
  { path: '/colombia', vista: colombia },
  { path: '/peru', vista: peru },
  // { path:'/platostipicosCol', vista: platostipicoscol },
];

const defaultRoute = '/';

function navigateTo(hash) {
  const route = routes.find((routeFind) => routeFind.path === hash);

  if (route && route.vista) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    if (root.firstChild) {
      while (root.firstChild) {
        root.removeChild(root.lastChild);
      }
    }
    root.append(...route.vista(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
