import * as firebase from '../firebase.js';
import { crearModal } from '../lib/index.js';

export function mostrarModal(titulo, txt) {
  console.log(`titulo: ${titulo}`);
  const encabezado = document.querySelector('#tituloModal');
  encabezado.textContent = titulo;
  location.href = '#openModal';
}

async function autenticarUsuario() {
  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('contraseña').value;
  let mensaje = '';
  if (usuario === '') {
    mensaje += 'ingrese su usuario ';
  }
  if (password === '') {
    mensaje += 'ingrese su contraseña';
  }
  alert(mensaje);
  if (usuario !== '' && password !== '') {
    const resultado = await firebase.autenticarUsuarios(usuario, password);
    setTimeout(() => {
      window.location.href = '/mapa';
    }, 5000);
  }
}

async function autenticarGoogle() {
  const resultado = await firebase.autenticarGoogle();
  if (resultado) {
    // eslint-disable-next-line no-alert, prefer-template
    alert('bienvenido (a)');
    window.location.href = '/mapa';
  } else {
    // eslint-disable-next-line no-alert
    alert('nombre de usuario o contraseña incorrectos');
  }
}

function login() {
  const section = document.createElement('section');
  const logo = document.createElement('img');
  const div = document.createElement('div');
  const title = document.createElement('h1');
  const inputUsuario = document.createElement('input');
  const inputContraseña = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const spanGoogle = document.createElement('span');
  const imagenGoogle = document.createElement('i');
  const pagina = [];

  logo.src = './imagenes/logo.jpg';
  logo.id = 'logoLogin';
  title.textContent = 'Un mundo de sabores a un clic de distancia';
  title.id = 'titleLogin';
  inputUsuario.placeholder = 'escribe tu usuario';
  inputUsuario.id = 'usuario';
  inputUsuario.className = 'ingreso';
  inputContraseña.placeholder = 'escribe tu contraseña';
  inputContraseña.type = 'password';
  inputContraseña.id = 'contraseña';
  inputContraseña.className = 'ingreso';
  spanGoogle.textContent = 'Ingresa con Google';
  spanGoogle.id = 'google';
  imagenGoogle.className = 'fa fa-google';
  imagenGoogle.addEventListener('click', autenticarGoogle);
  div.id = 'divLogin';

  buttonLogin.textContent = 'INGRESAR';
  buttonLogin.id = 'botonLogin';
  buttonLogin.className = 'ingreso';
  buttonLogin.addEventListener('click', autenticarUsuario);
  section.append(logo);
  spanGoogle.append(imagenGoogle);
  div.append(title, inputUsuario, inputContraseña, buttonLogin, spanGoogle, crearModal());
  pagina.push(section, div);
  return pagina;
}

export default login;
