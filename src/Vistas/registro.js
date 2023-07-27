import * as firebase from '../firebase.js';

async function registrarUsuarios() {
  const usuario = document.getElementById('email').value;
  const password = document.getElementById('contraseña').value;
  const resultado = await firebase.createUser(usuario, password);
  if (resultado) {
    alert(`registro exitoso ${resultado}`);
    window.location.href = '/mapa';
  } else {
    alert('datos incorrectos, verifica tu informacion');
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
