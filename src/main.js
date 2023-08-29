/* eslint-disable import/no-named-as-default-member */
// Importa las vistas
import home from './Vistas/home.js';
import login from './Vistas/login.js';
import error from './Vistas/error.js';
import mapa from './Vistas/mapa.js';
import registro from './Vistas/registro.js';
import muro from './Vistas/muro.js';
import publicaciones from './Vistas/publicaciones.js';

// manda llamar al nodo root por su id, sera el contenedor principal, donde
// se cargara el contenido de las vistas
const root = document.getElementById('root');

// se define routes, contiene objetos que describen las diferentes rutas de la
// aplicacion y las rutas asociadas a esas rutas
const routes = [
  { path: '/', vista: home }, // define un objeto que representa la ruta raiz '/' y la vista asociada llamada home
  { path: '/Login', vista: login },
  { path: '/error', vista: error },
  { path: '/mapa', vista: mapa },
  { path: '/registro', vista: registro },
  { path: '/muro', vista: muro },
  { path: '/publicaciones', vista: publicaciones },
];

const defaultRoute = '/';
// se define la funcion navigateTo, que acepta un parametro hash,
// que es la ruta a la que se quiere navegar
async function navigateTo(hash) {
  //  método find es un método de los arreglos que retorna la primer coincidencia
  // en lo que este evaluando (en nuestro caso evaluaremos que sea una comparación ===).
  // Crearemos una const llamada route cuyo valor será el objeto que retorne el método find.
  const route = routes.find((routeFind) => routeFind.path === hash);

  // verifica la existencia de route y rote.vista
  if (route && route.vista) {
    window.history.pushState( // agrega una nueva entrada al historial del navegador.
      {},
      route.path,
      window.location.origin + route.path,
    );

    // Si hay un elemento previamente renderizado lo vamos a quitar
    if (root.firstChild) {
      // Si existe un hijo en el elemento 'root', se eliminan todos los hijos del
      // elemento 'root' en un ciclo.
      while (root.firstChild) {
        root.removeChild(root.lastChild);
      }
    }
    // agrega la nueva vista al elemento con id root
    root.append(...await route.vista(navigateTo));
  } else {
    // Si no existe 'route' o no contiene la propiedad 'vista', redirige a la ruta '/error'.
    navigateTo('/error');
  }
}
// funcion onpopstate
window.onpopstate = () => {
  navigateTo(window.location.pathname);
};
// navega hacia la ruta si es valida de lo contrario genera opcion default
navigateTo(window.location.pathname || defaultRoute);
