import * as firebase from '../lib/index.js';

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
  buttonMexico.textContent = 'México';
  buttonPeru.textContent = 'Perú';
  buttonColombia.textContent = 'Colombia';
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
  mapas.src = './imagenes/logo.jpg';
  section.append(title, mapas, buttonMexico, buttonPeru, buttonColombia);
  paginaPrincipal.append(section);
  pagina.push(buttonCerrarSesion, section);
  return pagina;
}

export default mapa;
