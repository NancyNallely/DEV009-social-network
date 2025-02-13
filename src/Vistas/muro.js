/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable func-names */
import * as firebase from '../lib/index.js';
import mole from '../imagenes/mole.png';
import pozole from '../imagenes/pozole.png';
import colombiaC from '../imagenes/colombiaC.png';
import guacamola from '../imagenes/guacamola.png';
import peru1 from '../imagenes/peru1.png';
import peru2 from '../imagenes/peru2.png';
import mexicoLogo from '../imagenes/mexicoLogo.png';
import colLogo from '../imagenes/colLogo.png';
import peruLogo from '../imagenes/peruLogo.png';

// funcion para editar comentarios
export async function EditarComentario(nuevoComentario, doc) {
  const postId = doc.id; // Reemplaza con el ID del post que deseas editar
  const nuevosDatos = {
    comentario: nuevoComentario,
  };
  const resultado = await firebase.editarDocumento(postId, nuevosDatos);
  console.log(resultado);
  if (resultado) {
    window.location.href = '/muro';
  }
}
// funcion para crear DropDown
export function createDropDown(doc) {
  // Cierra el dropdown si el usuario da click en otro lado
  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i += 1) {
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
  dropbtn.type = 'button';
  dropbtn.className = 'dropbtn';
  dropbtn.textContent = '...';
  dropbtn.addEventListener('click', async () => {
    document.getElementById(`myDropdown_${doc.id}`).classList.toggle('show');
  });
  const myDropdown = document.createElement('div');
  myDropdown.id = `myDropdown_${doc.id}`;
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
        alert('Documento eliminado correctamente');
        window.location.href = '/muro';
        // Puedes actualizar la interfaz o realizar otras acciones después de eliminar
      } catch (error) {
        alert(error);
      }
    }
  });

  editLink.addEventListener('click', async () => {
    if (confirm('¿Deseas editar este post?')) {
      const comentario = document.getElementById(`comentario_${doc.id}`);
      const btnGuardar = document.querySelector('#botonGuardar');
      btnGuardar.style.display = 'block';
      comentario.disabled = false;
    }
  });

  myDropdown.append(editLink, deleteLink);
  dropdown.append(dropbtn, myDropdown);
  return dropdown;
}
// funcion para crear card de publicaciones en el muro
export async function crearPost(paisSeleccionado, tipo) {
  let listaPublicaciones;
  if (tipo == null) {
    listaPublicaciones = await firebase.registrosPais(paisSeleccionado);
  } else {
    listaPublicaciones = await firebase.registrosTipo(tipo, paisSeleccionado);
  }

  // div contenedor general, adentro contiene las card, cada card es un div
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
      const cardComentario = document.createElement('input');
      cardComentario.id = `comentario_${doc.id}`;
      cardComentario.disabled = true;
      cardComentario.value = publicacionesPaises.comentario;

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

      const botonGuardar = document.createElement('button');
      botonGuardar.type = 'button';
      botonGuardar.id = 'botonGuardar';
      botonGuardar.textContent = 'Guardar';
      botonGuardar.addEventListener('click', () => {
        EditarComentario(cardComentario.value, doc);
      });

      spanLikes.append(cardLikes);
      cardCalificacion.append(cardPrecio, cardServicio, cardPicante, spanLikes);
      card.append(cardContent, cardCalificacion, botonGuardar);
      contenedor.appendChild(card);// agrega hijos que son las cards creadas en el ciclo for each

      let clicBoton = false;
      spanLikes.addEventListener('click', () => {
        if (!clicBoton) {
          clicBoton = true;
          firebase.aumentoLikes(doc.id);
          let numLikes = Number(document.getElementById(doc.id).textContent);
          numLikes += 1;
          document.getElementById(doc.id).textContent = numLikes;
        }
      });
    });
  } else {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'no se encontraron publicaciones';
    contenedor.appendChild(mensaje);
  }
  return contenedor;
}
// funcion para crear una publicacion
export function agregarPost() {
  const informacion = document.createElement('input');
  informacion.addEventListener('click', () => {
    window.location.href = '/publicaciones';
  });
  informacion.id = 'inputPost';
  informacion.placeholder = 'Cuentanos tu experiencia en aquel lugar';
  return informacion;
}
// funcion para crear aside de platos tipicos
export function crearAside(pais) {
  let imgPlato1 = '';
  let imgPlato2 = '';
  let video1 = '';
  let video2 = '';
  switch (pais) {
    case 'Mexico':
      imgPlato1 = mole;
      imgPlato2 = pozole;
      video1 = 'https://www.youtube.com/watch?v=CiazCXbgg7A';
      video2 = 'https://www.youtube.com/watch?v=-Bi0cC6uzDs';
      break;
    case 'Colombia':
      imgPlato1 = colombiaC;
      imgPlato2 = guacamola;
      video1 = 'https://www.youtube.com/watch?v=P3W6BRM_65U';
      video2 = 'https://www.youtube.com/watch?v=R2DAkW3N_JY';
      break;
    case 'Peru':
      imgPlato1 = peru1;
      imgPlato2 = peru2;
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
// funcion para crear el muro
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
      imglogo = mexicoLogo;
      break;
    case 'Colombia':
      imglogo = colLogo;
      break;
    case 'Peru':
      imglogo = peruLogo;
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
    localStorage.setItem('tipo', 'cocina económica');
    navigateTo('/muro');
  });

  todosTipos.addEventListener('click', () => {
    localStorage.removeItem('tipo');
    navigateTo('/muro');
  });

  menu.classList.add('icon', 'btnMenu');
  barrasMenu.classList.add('fa', 'fa-bars');
  menu.appendChild(barrasMenu);
  menu.addEventListener('click', firebase.mostrarMenu);

  // se agregan varios elementos a cada elemento general que los contiene
  div.append(deLujo, paraTodos, cocinaEconomica, todosTipos, inicio, cerrarSesion);
  barraNav.append(title, logo, div, menu);
  main.append(await crearPost(pais, tipo));
  aside.append(crearAside(pais));// append une elementos html
  pagina.push(barraNav, aside, agregarPost(), main);// push mete elementos en un arreglo
  return pagina;// se retorna el arreglo pagina, que contiene todos los elementos que han
  // sido ensamblados para formar la página web.
}

export default muro;
