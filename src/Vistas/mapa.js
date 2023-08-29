import * as firebase from '../lib/index.js';
import logoImg from '../imagenes/logo.jpg';

function mapa(navigateTo) {
  localStorage.clear();
  const paginaPrincipal = document.getElementById('paginaPrincipal');
  const section = document.createElement('section');
  const buttonMexico = document.createElement('button');
  buttonMexico.id = 'buttonMexico';
  const buttonPeru = document.createElement('button');
  buttonPeru.id = 'buttonPeru';
  const buttonColombia = document.createElement('button');
  buttonColombia.id = 'buttonColombia';
  const buttonCerrarSesion = document.createElement('button');
  const title = document.createElement('h1');
  const mapas = document.createElement('img');
  const pagina = [];

  paginaPrincipal.id = 'paginaprincipalmapa'; // Agregamos un ID al elemento section creado
  section.id = 'mapasection';

  title.textContent = 'Selecciona tu país de destino';
  buttonCerrarSesion.textContent = 'Cerrar Sesión';
  buttonCerrarSesion.addEventListener('click', firebase.cerrarSesion);
  buttonMexico.addEventListener('click', () => {
    paginaPrincipal.id = 'paginaPrincipal';
    localStorage.setItem('paisSeleccionado', 'Mexico');
    navigateTo('/muro');
  });
  buttonColombia.addEventListener('click', () => {
    paginaPrincipal.id = 'paginaPrincipal';
    localStorage.setItem('paisSeleccionado', 'Colombia');
    navigateTo('/muro');
  });
  buttonPeru.addEventListener('click', () => {
    paginaPrincipal.id = 'paginaPrincipal';
    localStorage.setItem('paisSeleccionado', 'Peru');
    navigateTo('/muro');
  });
  mapas.src = logoImg;
  section.append(title, mapas, buttonMexico, buttonPeru, buttonColombia);
  // Se añade el elemento 'section' como hijo del elemento 'paginaPrincipal'.
  paginaPrincipal.append(section);
  // Se agrega el elemento 'section' al final del array 'pagina'.
  pagina.push(buttonCerrarSesion, section);
  // La función devuelve el array 'pagina' que contiene la estructura
  // organizada de la página de mapas.
  return pagina;
}
// Exporta la función 'mapa' como el valor por defecto del módulo actual.
export default mapa;
