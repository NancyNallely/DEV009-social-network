import * as firebase from '../lib/index.js';

function mostrarMenu() {
  const menu = document.getElementById('divHome');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

function crearPost() {
  const card = document.createElement('div');
  card.className = 'card';

  const cardContent = document.createElement('div');
  cardContent.className = 'cardContent';
  const cardTitulo = document.createElement('h3');
  cardTitulo.className = 'cardTitulo';
  const cardFigure = document.createElement('figure');
  cardFigure.className = 'cardFigure';
  const cardImage = document.createElement('img');
  cardImage.src = '../imagenes/peru3.png';
  cardImage.alt = 'comida';
  cardImage.className = 'cardImage';
  const imageCaption = document.createElement('figcaption');
  imageCaption.textContent = 'Lima 700';
  cardFigure.append(cardImage, imageCaption);
  const cardComentario = document.createElement('p');
  cardComentario.textContent = 'Es muy buena comida, me gusto mucho, pica poco y sabe bien';
  cardContent.append(cardTitulo, cardFigure, cardComentario);

  const cardCalificacion = document.createElement('div');
  cardCalificacion.className = 'cardCalificacion';
  const cardPrecio = document.createElement('p');
  cardPrecio.textContent = 'Precio';
  const cardServicio = document.createElement('p');
  cardServicio.textContent = 'Servicio';
  const cardPicante = document.createElement('p');
  cardPicante.textContent = 'Picante';
  cardCalificacion.append(cardPrecio, cardServicio, cardPicante);

  card.append(cardContent, cardCalificacion);
  return card;
}

function agregarPost() {
  const informacion = document.createElement('input');
  informacion.addEventListener('click', () => {
    window.location.href = '/publicaciones';
  });
  informacion.id = 'inputPost';
  informacion.placeholder = 'Cuentanos tu experiencia en aquel lugar';
  return informacion;
}

function crearAside() {
  const divAside = document.createElement('div');
  divAside.id = 'aside';
  const tituloAside = document.createElement('h3');
  tituloAside.textContent = 'Platos típicos';
  const aImgAside1 = document.createElement('a');
  aImgAside1.href = 'https://www.youtube.com/watch?v=VdncHbR6-yk';
  aImgAside1.target = '_blank';
  const imgAside1 = document.createElement('img');
  imgAside1.src = '../imagenes/peru1.png';
  aImgAside1.appendChild(imgAside1);
  const aImgAside2 = document.createElement('a');
  aImgAside2.href = 'https://www.youtube.com/watch?v=Bb83VID7cyk';
  aImgAside2.target = '_blank';
  const imgAside2 = document.createElement('img');
  imgAside2.src = '../imagenes/peru2.png';
  aImgAside2.appendChild(imgAside2);
  divAside.append(tituloAside, aImgAside1, aImgAside2);

  return divAside;
}

function peru(navigateTo) {
  // Obtener referencia al elemento nav
  const barraNav = document.createElement('nav');
  // Crear los elementos de la navegación
  const title = document.createElement('h1');
  const logo = document.createElement('img');
  const div = document.createElement('div');
  const deLujo = document.createElement('a');
  const paraTodos = document.createElement('a');
  const cocinaEconomica = document.createElement('a');
  const perfil = document.createElement('a');
  const buscar = document.createElement('a');
  const inicio = document.createElement('a');
  const cerrarSesion = document.createElement('a');
  const menu = document.createElement('a');
  const barrasMenu = document.createElement('i');
  const main = document.createElement('main');
  const aside = document.createElement('aside');
  const pagina = [];

  barraNav.id = 'barraNav';
  logo.src = '../imagenes/peruLogo.png';
  logo.id = 'logohome';
  main.id = 'mainHome';
  aside.id = 'aside';
  div.id = 'divHome';
  title.textContent = 'PERÚ';
  deLujo.textContent = 'DE LUJO';
  paraTodos.textContent = 'PARA TODOS';
  cocinaEconomica.textContent = 'COCINA ECONOMICA';
  perfil.textContent = 'PERFIL';
  buscar.textContent = 'BUSCAR';
  inicio.textContent = 'INICIO';
  cerrarSesion.textContent = 'CERRAR SESIÓN';

  cerrarSesion.addEventListener('click', firebase.cerrarSesion);
  inicio.addEventListener('click', () => {
    navigateTo('/mapa');
  });

  menu.classList.add('icon', 'btnMenu');
  barrasMenu.classList.add('fa', 'fa-bars');
  menu.appendChild(barrasMenu);
  menu.addEventListener('click', mostrarMenu);

  div.append(deLujo, paraTodos, cocinaEconomica, perfil, buscar, inicio, cerrarSesion);
  barraNav.append(title, logo, div, menu);
  main.append(crearPost());
  aside.append(crearAside());
  pagina.push(barraNav, aside, agregarPost(), main);

  return pagina;
}

export default peru;
