import * as firebase from '../lib/index.js';

function mostrarMenu() {
  const menu = document.getElementById('divHome');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

async function crearPost(paisSeleccionado) {
  const listaPublicaciones = await firebase.registrosPais(paisSeleccionado);
  const contenedor = document.createElement('div');
  contenedor.className = 'contenedor';
  if (listaPublicaciones.length > 0) {
    listaPublicaciones.forEach((doc) => {
      const publicacionesPaises = doc.data();
      const card = document.createElement('div');
      card.className = 'card';

      const cardContent = document.createElement('div');
      cardContent.className = 'cardContent';
      const cardTitulo = document.createElement('h3');
      cardTitulo.className = 'cardTitulo';
      const cardFigure = document.createElement('figure');
      cardFigure.className = 'cardFigure';
      const cardImage = document.createElement('img');
      cardImage.src = publicacionesPaises.foto;
      cardImage.alt = 'comida';
      cardImage.className = 'cardImage';
      const imageCaption = document.createElement('figcaption');
      imageCaption.textContent = publicacionesPaises.nombreLugar;
      cardFigure.append(cardImage, imageCaption);
      const cardComentario = document.createElement('p');
      cardComentario.textContent = publicacionesPaises.comentario;
      cardContent.append(cardTitulo, cardFigure, cardComentario);

      const cardCalificacion = document.createElement('div');
      cardCalificacion.className = 'cardCalificacion';
      const cardPrecio = document.createElement('p');
      cardPrecio.textContent = publicacionesPaises.precio;
      const cardServicio = document.createElement('p');
      cardServicio.textContent = publicacionesPaises.servicio;
      const cardPicante = document.createElement('p');
      cardPicante.textContent = publicacionesPaises.nivelPicante;
      cardCalificacion.append(cardPrecio, cardServicio, cardPicante);

      card.append(cardContent, cardCalificacion);
      contenedor.appendChild(card);
    });
  } else {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'no se encontraron publicaciones';
    contenedor.appendChild(mensaje);
  }
  return contenedor;
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
  aImgAside1.href = 'https://www.youtube.com/watch?v=-Bi0cC6uzDs';
  aImgAside1.target = '_blank';
  const imgAside1 = document.createElement('img');
  imgAside1.src = '../imagenes/pozole.png';
  aImgAside1.appendChild(imgAside1);
  const aImgAside2 = document.createElement('a');
  aImgAside2.href = 'https://www.youtube.com/watch?v=CiazCXbgg7A';
  aImgAside2.target = '_blank';
  const imgAside2 = document.createElement('img');
  imgAside2.src = '../imagenes/mole.png';
  aImgAside2.appendChild(imgAside2);
  divAside.append(tituloAside, aImgAside1, aImgAside2);

  return divAside;
}

async function muro(navigateTo) {
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

  console.log('tipo pagina muro' + typeof pagina);

  barraNav.id = 'barraNav';
  logo.src = '../imagenes/mexicoLogo.png';
  logo.id = 'logohome';
  main.id = 'mainHome';
  aside.id = 'aside';
  div.id = 'divHome';
  title.textContent = 'MÉXICO';
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
  main.append(await crearPost(localStorage.getItem('paisSeleccionado')));
  console.log('tipo main muro' + typeof main);
  aside.append(crearAside());
  pagina.push(barraNav, aside, agregarPost(), main);
  console.log('tipo pagina muro' + typeof pagina);
  return pagina;
}

export default muro;
