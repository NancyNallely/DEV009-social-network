import * as firebase from '../lib/index.js';

function registro() {
  const pagina = [];
  const section = document.createElement('section');
  section.id = 'registroSection'; // Agregamos un ID al elemento section creado
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
  button.type = 'button';
  button.addEventListener('click', firebase.registrarUsuarios);

  // Se añaden los elementos 'title', 'name', 'lastname', 'email', 'emailagain',
  // 'newpassword', 'birthdate' y 'button' como hijos del elemento 'section'.
  section.append(title, name, lastname, email, emailagain, newpassword, birthdate, button);
  // Se agrega el elemento 'section' al final del array 'pagina'.
  pagina.push(section);
  // La función devuelve el array 'pagina' que contiene la estructura
  // organizada de la página de registro.
  return pagina;
}
// Exporta la función 'registro' como el valor por defecto del módulo actual.
export default registro;
