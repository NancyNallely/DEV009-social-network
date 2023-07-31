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

async function registrarUsuarios() {
  const usuario = document.getElementById('email').value;
  const password = document.getElementById('contraseña').value;

  let mensaje = '';
  if (usuario === '') {
    mensaje += 'ingrese su usuario ';
  } else  {
    validarUsuario(usuario);
  }
  if (password === '') {
    mensaje += 'ingrese su contraseña';
  }
  if (mensaje !== '') {
    alert(mensaje);
  }
  if (usuario !== '' && password !== '') {
    firebase.createUser(usuario, password);
  }
}

function registro() {
  const pagina = [];
  const section = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = 'Bienvenidos a la ruta del sabor';
  const name = document.createElement('input');
  name.placeholder = 'Nombre';
  const lastname = document.createElement('input');
  lastname.placeholder = 'Apellido';
  const email = document.createElement('input');
  email.id = 'email';
  email.placeholder = 'Correo'; // Corregido el nombre de la etiqueta
  const emailagain = document.createElement('input');
  emailagain.placeholder = 'Repetir correo';
  const newpassword = document.createElement('input');
  newpassword.id = 'contraseña';
  newpassword.placeholder = 'Nueva contraseña';
  const birthdate = document.createElement('input');
  birthdate.type = 'date'; // Asignar el tipo "date" para el campo de fecha
  birthdate.placeholder = 'Fecha de Nacimiento';
  const button = document.createElement('button');
  button.textContent = 'Registrarse';
  button.id = 'Registrarseboton';
  button.addEventListener('click', registrarUsuarios);

  section.append(title, name, lastname, email, emailagain, newpassword, birthdate, button);
  section.id = 'registroSection'; // Agregamos un ID al elemento section creado
  pagina.push(section);
  return pagina;
}
export default registro;
