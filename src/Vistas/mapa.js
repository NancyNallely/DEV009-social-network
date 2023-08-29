import * as firebase from '../lib/index.js';
import logoImg from '../imagenes/logo.jpg';

// se define una f mapa que acepta un argumento navigateTo
function mapa(navigateTo) {
  // Limpia todos los datos almacenados en el almacenamiento local
  localStorage.clear();
  // Obtiene la referencia al elemento con el ID 'paginaPrincipal'
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
  // Crea un nuevo array llamado 'pagina' para almacenar elementos y estructurar la página.
  const pagina = [];

  paginaPrincipal.id = 'paginaprincipalmapa'; // Agregamos un ID al elemento section creado
  section.id = 'mapasection';

  title.textContent = 'Selecciona tu país de destino';
  buttonCerrarSesion.textContent = 'Cerrar Sesión';
  buttonCerrarSesion.addEventListener('click', firebase.cerrarSesion);

  buttonMexico.addEventListener('click', () => {
    paginaPrincipal.id = 'paginaPrincipal';
    // Almacena en el almacenamiento local el valor 'Mexico' asociado a la clave 'paisSeleccionado'
    localStorage.setItem('paisSeleccionado', 'Mexico');
    // Navega a la ruta '/muro' usando la función 'navigateTo'
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
