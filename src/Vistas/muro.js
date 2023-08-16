/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable func-names */
import * as firebase from '../lib/index.js';

function mostrarMenu() {
  const menu = document.getElementById('divHome');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

function createDropDown(doc) {
  function myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
  }
  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';
  const dropbtn = document.createElement('button');
  dropbtn.className = 'dropbtn';
  dropbtn.textContent = '...';
  dropbtn.addEventListener('click', myFunction);
  const myDropdown = document.createElement('div');
  myDropdown.id = 'myDropdown';
  myDropdown.className = 'dropdown-content';
  const editLink = document.createElement('a');
  editLink.textContent = 'Editar';
  const deleteLink = document.createElement('a');
  deleteLink.textContent = 'Eliminar';
  deleteLink.addEventListener('click', async () => {
    if (confirm('¿Desea borrar este post?')) {
      const postId = doc.id; // Reemplaza con el ID del post que deseas eliminar
      try {
        await firebase.docDelete(postId);
        console.log('Documento eliminado correctamente');
        window.location.href = '/muro';
        // Puedes actualizar la interfaz o realizar otras acciones después de eliminar
      } catch (error) {
        console.log(error);
      }
    }
  });
  myDropdown.append(editLink, deleteLink);
  dropdown.append(dropbtn, myDropdown);
  return dropdown;
}

async function crearPost(paisSeleccionado, tipo) {
  let listaPublicaciones;
  if (tipo == null) {
    listaPublicaciones = await firebase.registrosPais(paisSeleccionado);
  } else {
    listaPublicaciones = await firebase.registrosTipo(tipo, paisSeleccionado);
  }

  listaPublicaciones = await firebase.registrosPais(paisSeleccionado);
  const contenedor = document.createElement('div');
  contenedor.className = 'contenedor';
  if (listaPublicaciones.length > 0) {
    listaPublicaciones.forEach((doc) => {
      const publicacionesPaises = doc.data();
      const card = document.createElement('div');
      card.className = 'card';

      const cardContent = document.createElement('div');
      cardContent.className = 'cardContent';
      const cardTitulo = document.createElement('h6');
      cardTitulo.className = 'cardTitulo';
      cardTitulo.textContent = publicacionesPaises.usuario;
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

      const Divbotton = createDropDown(doc);

      cardContent.append(Divbotton, cardTitulo, cardFigure, cardComentario);

      const cardCalificacion = document.createElement('div');
      cardCalificacion.className = 'cardCalificacion';
      const cardPrecio = document.createElement('p');
      cardPrecio.textContent = publicacionesPaises.precio;
      const cardServicio = document.createElement('p');
      cardServicio.textContent = publicacionesPaises.servicio;
      const cardPicante = document.createElement('p');
      cardPicante.textContent = publicacionesPaises.nivelPicante;
      const spanLikes = document.createElement('span');
      // spanLikes.textContent = 'Me gusta';
      spanLikes.className = 'spanLikes';
      const cardLikes = document.createElement('i');
      cardLikes.id = doc.id;
      cardLikes.className = 'fa fa-thumbs-up';
      cardLikes.textContent = publicacionesPaises.likes;

      spanLikes.append(cardLikes);
      cardCalificacion.append(cardPrecio, cardServicio, cardPicante, spanLikes);
      card.append(cardContent, cardCalificacion);
      contenedor.appendChild(card);

      spanLikes.addEventListener('click', () => {
        firebase.aumentoLikes(doc.id);
        let numLikes = Number(document.getElementById(doc.id).textContent);
        numLikes += 1;
        document.getElementById(doc.id).textContent = numLikes;
      });
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

function crearAside(pais) {
  let imgPlato1 = '';
  let imgPlato2 = '';
  let video1 = '';
  let video2 = '';
  switch (pais) {
    case 'Mexico':
      imgPlato1 = '../imagenes/mole.png';
      imgPlato2 = '../imagenes/pozole.png';
      video1 = 'https://www.youtube.com/watch?v=CiazCXbgg7A';
      video2 = 'https://www.youtube.com/watch?v=-Bi0cC6uzDs';
      break;
    case 'Colombia':
      imgPlato1 = '../imagenes/colombiaC.png';
      imgPlato2 = '../imagenes/guacamola.png';
      video1 = 'https://www.youtube.com/watch?v=P3W6BRM_65U';
      video2 = 'https://www.youtube.com/watch?v=R2DAkW3N_JY';
      break;
    case 'Peru':
      imgPlato1 = '../imagenes/peru1.png';
      imgPlato2 = '../imagenes/peru2.png';
      video1 = 'https://www.youtube.com/watch?v=VdncHbR6-yk';
      video2 = 'https://www.youtube.com/watch?v=Bb83VID7cyk';
      break;

    default:
      break;
  }

  const divAside = document.createElement('div');
  divAside.id = 'aside';
  const tituloAside = document.createElement('h3');
  tituloAside.textContent = 'Platos típicos';
  const aImgAside1 = document.createElement('a');
  aImgAside1.href = video1;
  aImgAside1.target = '_blank';
  const imgAside1 = document.createElement('img');
  imgAside1.src = imgPlato1;
  aImgAside1.appendChild(imgAside1);
  const aImgAside2 = document.createElement('a');
  aImgAside2.href = video2;
  aImgAside2.target = '_blank';
  const imgAside2 = document.createElement('img');
  imgAside2.src = imgPlato2;
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
  const todosTipos = document.createElement('a');
  const buscarto = document.createElement('input');
  const inicio = document.createElement('a');
  const cerrarSesion = document.createElement('a');
  const menu = document.createElement('a');
  const barrasMenu = document.createElement('i');
  const main = document.createElement('main');
  const aside = document.createElement('aside');
  const pagina = [];

  barraNav.id = 'barraNav';

  const pais = localStorage.getItem('paisSeleccionado');
  const tipo = localStorage.getItem('tipo');
  let imglogo = '';
  switch (pais) {
    case 'Mexico':
      imglogo = '../imagenes/mexicoLogo.png';
      break;
    case 'Colombia':
      imglogo = '../imagenes/colLogo.png';
      break;
    case 'Peru':
      imglogo = '../imagenes/peruLogo.png';
      break;

    default:
      break;
  }
  logo.src = imglogo;
  logo.id = 'logohome';
  main.id = 'mainHome';
  aside.id = 'aside';
  div.id = 'divHome';
  title.textContent = pais;
  deLujo.textContent = 'DE LUJO';
  paraTodos.textContent = 'PARA TODOS';
  cocinaEconomica.textContent = 'COCINA ECONOMICA';
  todosTipos.textContent = 'TODOS';
  buscarto.placeholder = 'BUSCAR';
  buscarto.id = 'buscartodo';
  inicio.textContent = 'INICIO';
  cerrarSesion.textContent = 'CERRAR SESIÓN';

  cerrarSesion.addEventListener('click', firebase.cerrarSesion);
  inicio.addEventListener('click', () => {
    navigateTo('/mapa');
  });

  deLujo.addEventListener('click', () => {
    localStorage.setItem('tipo', 'de lujo');
    navigateTo('/muro');
  });

  paraTodos.addEventListener('click', () => {
    localStorage.setItem('tipo', 'para todos');
    navigateTo('/muro');
  });

  cocinaEconomica.addEventListener('click', () => {
    localStorage.setItem('tipo', 'cocina economica');
    navigateTo('/muro');
  });

  todosTipos.addEventListener('click', () => {
    localStorage.removeItem('tipo');
    navigateTo('/muro');
  });

  menu.classList.add('icon', 'btnMenu');
  barrasMenu.classList.add('fa', 'fa-bars');
  menu.appendChild(barrasMenu);
  menu.addEventListener('click', mostrarMenu);

  div.append(deLujo, paraTodos, cocinaEconomica, todosTipos, inicio, cerrarSesion);
  barraNav.append(title, logo, div, menu);
  main.append(await crearPost(pais, tipo));
  aside.append(crearAside(pais));
  pagina.push(barraNav, aside, agregarPost(), main);
  return pagina;
}

export default muro;
