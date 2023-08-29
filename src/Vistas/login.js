import * as firebase from '../lib/index.js';
import logoImg from '../imagenes/logo.jpg';

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

  logo.src = logoImg;
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
  section.append(logo);// Se añade el elemento 'logo' como hijo del elemento 'section'.
  // Se añade el elemento 'imagenGoogle' como hijo del elemento 'spanGoogle'.
  spanGoogle.append(imagenGoogle);
  spanOlvido.append(olvidoPassword);
  div.append(title, inputUsuario, inputContraseña, buttonLogin, spanGoogle, spanOlvido);
  // Se agrega el elemento 'section' y el elemento 'div' al final del array 'pagina'.
  pagina.push(section, div);
  // La función devuelve el array 'pagina' que contiene la estructura organizada
  // de la página de inicio de sesión.
  return pagina;
}

// Exporta la función 'login' como el valor por defecto del módulo actual.
export default login;
