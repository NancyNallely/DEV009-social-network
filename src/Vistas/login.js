import * as firebase from '../firebase.js';

function validarUsuario(usuario) {
  // Expresión regular para validar el formato de un correo electrónico
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Comprueba si el correo coincide con el formato esperado
  if (regex.test(usuario)) {
    return true; // El correo es válido
  }
  alert('El correo electrónico ingresado no tiene un formato válido.'); // Muestra un mensaje de alerta
  return false; // El correo no es válido
}

function autenticarUsuario() {
  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('contraseña').value;
  let mensaje = '';
  if (usuario === '') {
    mensaje += 'ingrese su usuario ';
  } else {
    validarUsuario(usuario);
  }
  if (password === '') {
    mensaje += 'ingrese su contraseña';
  }
  if (mensaje !== '') {
    alert(mensaje);
  }

  if (usuario !== '' && password !== '') {
    firebase.autenticarUsuarios(usuario, password);
  }
}

function autenticarGoogle() {
  firebase.autenticarGoogle();
}

function restablecerPassword() {
  const email = prompt('Ingrese su email');
  firebase.restaurarPassword(email);
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
  imagenGoogle.addEventListener('click', autenticarGoogle);
  div.id = 'divLogin';
  olvidoPassword.textContent = '¿Olvidaste tu contraseña?';
  olvidoPassword.addEventListener('click', restablecerPassword);
  div.id = 'divLogin';

  buttonLogin.textContent = 'INGRESAR';
  buttonLogin.id = 'botonLogin';
  buttonLogin.className = 'ingreso';
  buttonLogin.addEventListener('click', autenticarUsuario);
  section.append(logo);
  spanGoogle.append(imagenGoogle);
  spanOlvido.append(olvidoPassword);
  div.append(title, inputUsuario, inputContraseña, buttonLogin, spanGoogle, spanOlvido);
  pagina.push(section, div);
  return pagina;
}

export default login;
