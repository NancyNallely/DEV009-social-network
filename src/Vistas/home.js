import * as firebase from '../lib/index.js';
import logoImg from '../imagenes/logo.jpg';

function home(navigateTo) {
  // Obtener referencia al elemento nav
  const barraNav = document.createElement('nav');
  // Crear los elementos de la navegación
  const logo = document.createElement('img');
  const div = document.createElement('div');
  const bienvenida = document.createElement('h1');
  const registro = document.createElement('a');
  const ingreso = document.createElement('a');
  const menu = document.createElement('a');
  const barrasMenu = document.createElement('i');

  const main = document.createElement('main');
  const intro = document.createElement('p');
  const pagina = [];

  barraNav.id = 'barraNav';
  logo.src = logoImg;
  logo.id = 'logohome';
  main.id = 'mainHome';
  div.id = 'divHome';

  menu.classList.add('icon', 'btnMenu');
  barrasMenu.classList.add('fa', 'fa-bars');
  menu.appendChild(barrasMenu);
  menu.addEventListener('click', firebase.mostrarMenu);

  bienvenida.textContent = 'BIENVENIDO';
  bienvenida.className = 'Bienvenida';
  registro.textContent = 'Registrarse';
  registro.addEventListener('click', () => {
    navigateTo('/registro');
  });

  ingreso.textContent = 'Ingresar';
  ingreso.addEventListener('click', () => {
    navigateTo('/Login');
  });

  intro.textContent = '¿Visitas México, Colombia o Perú pronto?. Aqui podrás encontrar recomendaciones para comer según tu presupuesto y también compartirnos tus experiencias propias.';
  div.append(registro, ingreso);
  barraNav.append(bienvenida, div, menu, logo);
  main.append(intro); // Se añade el elemento 'intro' como hijo del elemento 'main'.
  pagina.push(barraNav);// Se agrega el elemento 'barraNav' al final del array 'pagina'.
  pagina.push(main);// Se agrega el elemento 'main' al final del array 'pagina'.
  // La función devuelve el array 'pagina' que contiene la estructura organizada de la página web.
  return pagina;
}
// Exporta la función 'home' como el valor por defecto del módulo actual.
export default home;
