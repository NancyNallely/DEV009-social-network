// Importa las vistas
import home from './Vistas/home.js';
import login from './Vistas/login.js';
import error from './Vistas/error.js';
import mapa from './Vistas/mapa.js';
import registro from './Vistas/registro.js';
import mexico from './Vistas/mexico.js';
import colombia from './Vistas/colombia.js';
import peru from './Vistas/peru.js';
import publicaciones from './Vistas/publicaciones.js';

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
  { path: '/publicaciones', vista: publicaciones },
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
