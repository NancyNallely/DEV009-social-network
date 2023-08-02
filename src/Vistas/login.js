import * as firebase from '../lib/index.js';

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
  const spanOlvido = document.createElement('span');
  const olvidoPassword = document.createElement('a');
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
  imagenGoogle.addEventListener('click', firebase.autenticarGoogle);
  div.id = 'divLogin';
  olvidoPassword.textContent = '¿Olvidaste tu contraseña?';
  olvidoPassword.addEventListener('click', firebase.restablecerPassword);
  div.id = 'divLogin';

  buttonLogin.textContent = 'INGRESAR';
  buttonLogin.id = 'botonLogin';
  buttonLogin.className = 'ingreso';
  buttonLogin.addEventListener('click', firebase.autenticarUsuario);
  section.append(logo);
  spanGoogle.append(imagenGoogle);
  spanOlvido.append(olvidoPassword);
  div.append(title, inputUsuario, inputContraseña, buttonLogin, spanGoogle, spanOlvido);
  pagina.push(section, div);
  return pagina;
}

export default login;
