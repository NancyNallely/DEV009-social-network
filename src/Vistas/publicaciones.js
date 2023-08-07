import * as firebase from '../lib/index.js';

function mostrarMenu() {
  const menu = document.getElementById('divHome');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}
function publicarDatos() {
  const formulario = document.querySelectorAll('.formInput');
  const usuarioActual = firebase.obtenerUsuario();
  const resultado = firebase.guardarRegistros(formulario, localStorage.getItem('imgUrl'), usuarioActual);
  if (resultado) {
    alert('publicacion realizada con exito');
  } else {
    alert('error de publicacion');
  }
}

async function subirImg() {
  const img = document.querySelector('.updloadedImg');
  await firebase.getImgUrl(img.files[0], img.files[0].name);
}

function publicaciones(navigateTo) {
  // Obtener referencia al elemento nav
  const barraNav = document.createElement('nav');
  // Crear los elementos de la navegación
  const mex = document.createElement('img');
  const per = document.createElement('img');
  const col = document.createElement('img');
  const title = document.createElement('h1');
  const logo = document.createElement('img');
  const div = document.createElement('div');
  const deLujo = document.createElement('a');
  const paraTodos = document.createElement('a');
  const cocinaEconomica = document.createElement('a');
  const promociones = document.createElement('a');
  const perfil = document.createElement('a');
  const buscar = document.createElement('a');
  const inicio = document.createElement('a');
  const cerrarSesion = document.createElement('a');
  const menu = document.createElement('a');
  const barrasMenu = document.createElement('i');
  const main = document.createElement('main');
  const formulario = document.createElement('form');
  const lugar = document.createElement('input');
  const pais = document.createElement('select');
  const mexico = document.createElement('option');
  const colombia = document.createElement('option');
  const peru = document.createElement('option');
  const tipo = document.createElement('select');
  const lujo = document.createElement('option');
  const todos = document.createElement('option');
  const economica = document.createElement('option');
  const servicio = document.createElement('select');
  const excelente = document.createElement('option');
  const bueno = document.createElement('option');
  const malo = document.createElement('option');
  const precio = document.createElement('select');
  const caro = document.createElement('option');
  const medio = document.createElement('option');
  const barato = document.createElement('option');
  const nivelPicante = document.createElement('select');
  const alto = document.createElement('option');
  const intermedio = document.createElement('option');
  const bajo = document.createElement('option');
  const comentario = document.createElement('input');
  const foto = document.createElement('input');
  const publicar = document.createElement('button');

  const pagina = [];

  barraNav.id = 'barraNav';
  mex.src = '../imagenes/mexicoLogo.png';
  mex.id = 'logom';
  per.src = '../imagenes/peruLogo.png';
  per.id = 'logop';
  col.src = '../imagenes/colLogo.png';
  col.id = 'logoc';
  logo.src = '../imagenes/logo.jpg';
  logo.id = 'logohome';
  main.id = 'mainHome';
  div.id = 'divHome';
  title.textContent = 'Cuentanos tu experiencia en aquel lugar';
  deLujo.textContent = 'DE LUJO';
  paraTodos.textContent = 'PARA TODOS';
  cocinaEconomica.textContent = 'COCINA ECONOMICA';
  promociones.textContent = 'PROMOCIONES';
  perfil.textContent = 'PERFIL';
  buscar.textContent = 'BUSCAR';
  inicio.textContent = 'INICIO';
  cerrarSesion.textContent = 'CERRAR SESIÓN';
  formulario.id = 'form';
  lugar.placeholder = 'nombre del lugar';
  lugar.type = 'text';
  lugar.className = 'formInput';
  pais.name = 'paises';
  pais.className = 'formInput';
  mexico.value = 'México';
  mexico.textContent = 'México';
  colombia.value = 'Colombia';
  colombia.textContent = 'Colombia';
  peru.value = 'Perú';
  peru.textContent = 'Perú';
  tipo.name = 'tipos';
  tipo.className = 'formInput';
  lujo.value = 'de lujo';
  lujo.textContent = 'de lujo';
  todos.value = 'para todos';
  todos.textContent = 'para todos';
  economica.value = 'cocina económica';
  economica.textContent = 'cocina económica';
  servicio.name = 'niveles';
  servicio.className = 'formInput';
  excelente.value = 'servicio excelente';
  excelente.textContent = 'servicio excelente';
  bueno.value = 'servicio bueno';
  bueno.textContent = 'servicio bueno';
  malo.value = 'servicio malo';
  malo.textContent = 'servicio malo';
  precio.name = 'precios';
  precio.className = 'formInput';
  caro.value = 'caro';
  caro.textContent = 'caro';
  medio.value = 'costo medio';
  medio.textContent = 'costo medio';
  barato.value = 'barato';
  barato.textContent = 'barato';
  nivelPicante.name = 'picante';
  nivelPicante.className = 'formInput';
  alto.value = 'picante alto';
  alto.textContent = 'picante alto';
  intermedio.value = 'picante intermedio';
  intermedio.textContent = 'picante intermedio';
  bajo.value = 'picante bajo';
  bajo.textContent = 'picante bajo';
  comentario.placeholder = 'comparte tu experiencia';
  comentario.className = 'formInput';
  comentario.type = 'text';
  foto.accept = 'image/*';
  foto.type = 'file';
  foto.className = 'formInput updloadedImg';
  foto.placeholder = 'Ingrese una imagen';
  publicar.type = 'button';
  publicar.textContent = 'publicar';
  publicar.id = 'publicar';
  main.id = 'mainP';

  foto.addEventListener('change', subirImg);

  cerrarSesion.addEventListener('click', firebase.cerrarSesion);
  inicio.addEventListener('click', () => {
    navigateTo('/mapa');
  });

  publicar.addEventListener('click', publicarDatos);

  menu.classList.add('icon', 'btnMenu');
  barrasMenu.classList.add('fa', 'fa-bars');
  menu.appendChild(barrasMenu);
  menu.addEventListener('click', mostrarMenu);

  div.append(deLujo, paraTodos, cocinaEconomica, promociones, perfil, buscar, inicio, cerrarSesion);
  barraNav.append(title, logo, div, menu, mex, per, col);
  pais.append(mexico, colombia, peru);
  tipo.append(lujo, todos, economica);
  servicio.append(excelente, bueno, malo);
  precio.append(caro, medio, barato);
  nivelPicante.append(alto, intermedio, bajo);
  formulario.append(
    foto,
    lugar,
    pais,
    tipo,
    servicio,
    precio,
    nivelPicante,
    comentario,
    publicar,
  );
  main.append(formulario);
  pagina.push(barraNav, main);

  return pagina;
}

export default publicaciones;
